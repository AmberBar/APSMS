package com.apsms.controller;

import com.apsms.modal.JsonResponse;
import com.apsms.modal.user.User;
import com.apsms.service.UserService;
import com.apsms.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RequestMapping("/api/users")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/query")
    public JsonResponse usersAll(
            @RequestParam("username") String username,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
            ) {

        User user = new User();
        user.setUsername(username);
        Page<User> users= userService.queryAll(  user, pageNumber, pageSize);
        System.out.print(users);
        return new JsonResponse(true, users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getUserInfo")
    public JsonResponse usersAll(

    ) {
        User user= userService.getCurrentUser();
        return new JsonResponse(true, user);
    }

    @PostMapping("/login")
    public JsonResponse users( @RequestParam("username") String username,
                                @RequestParam("password") String password) throws Exception{
        User user = userService.findUserByName(username);

        if (user == null) {
            throw  new IllegalArgumentException("username or password is wrong");
        }

        UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken( username, password);

        Authentication authentication = authenticationManager.authenticate(upToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        String token = jwtTokenUtil.generateToken(userDetails);

        return new JsonResponse(true,  token);
    }

    @GetMapping("/{name}")
    public List<User> findUserByName( @PathVariable("name") String name) {

        List users = userService.fuzzyQueryUsersByName(name);

        return users;
    }

    @PostMapping("/create")
    public JsonResponse CreateUser (
            @Valid @RequestBody User user
            ) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        User oldUser = userService.findUserByName(user.getUsername());

        if (oldUser != null) {
            throw new IllegalArgumentException("username is exit");
        }

        User newUser = userService.createUser(user);

        UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken( newUser.getUsername(), user.getPassword());

        Authentication authentication = authenticationManager.authenticate(upToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = userDetailsService.loadUserByUsername(newUser.getUsername());

        String token = jwtTokenUtil.generateToken(userDetails);

        return new JsonResponse(true,  token);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public JsonResponse deleteUser(@RequestBody  User user) {
        System.out.println(user);
        userService.deleteUser(user);
        return new JsonResponse(true, "delete success");
    }

    @PutMapping("/update")
    public JsonResponse UpdateUser(@RequestBody User user) {
        return new JsonResponse(true, userService.updateUser(user));
    }

    @PutMapping("/update/info")
    public JsonResponse updateInfo(@RequestBody User user) {
        return new JsonResponse(true, userService.updateInfo(user));
    }

    /**
     * 刷新密钥
     *
     * @param authorization 原密钥
     * @return 新密钥
     * @throws AuthenticationException 错误信息
     */
    @GetMapping(value = "/refreshToken")
    public String refreshToken(@RequestHeader String authorization) throws AuthenticationException {
        return userService.refreshToken(authorization);
    }

    @GetMapping("findOne")
    public JsonResponse getUser() {
        User user = userService.getCurrentUser();
        return new JsonResponse(true, user);
    }
}
