package com.apsms.controller;

import com.apsms.modal.JsonResponse;
import com.apsms.modal.User;
import com.apsms.service.UserService;
import com.apsms.utils.Md5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RequestMapping("/api/users")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

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

    @PostMapping("/login")
    public JsonResponse users(@RequestParam("username") String name,
                            @RequestParam("password") String password) throws Exception{
        User user = userService.findUserByName(name);
        System.out.println(user);

        if (user == null) {
            throw  new IllegalArgumentException("username or password is wrong");
        }

        password = Md5Util.EncoderByMd5(password);

        if (!user.getPassword().equals(password) ) {
            throw  new IllegalArgumentException("username or password is wrong");
        }
        return new JsonResponse(true, user);
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

        System.out.println(user);
        if (oldUser != null) {
            throw new IllegalArgumentException("username is exit");
        }
        User newUser = userService.createUser(user);

        return new JsonResponse(true, newUser);
    }

    @DeleteMapping("/{name}")
    public void deleteUser(@PathVariable("name") String name) {
        userService.deleteUserByName(name);
    }

    @PutMapping("")
    public User UpdateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }
}
