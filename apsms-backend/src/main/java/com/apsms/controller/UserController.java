package com.apsms.controller;

import com.apsms.Exception.UserNotExistExcepion;
import com.apsms.modal.JsonResponse;
import com.apsms.modal.User;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RequestMapping("/api/users")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/find")
    public List<User> usersAll() {

        List<User> users = userService.queryAll();
        System.out.print(users);
        return users;
    }

    @PostMapping("/check")
    public JsonResponse users(@RequestParam("username") String name,
                            @RequestParam("password") String password) {
        User user = userService.findUserByName(name);

        if (user == null) {
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
    ) {
        user.setRegDate(new Date());
        User oldUser = userService.findUserByName(user.getUsername());
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
