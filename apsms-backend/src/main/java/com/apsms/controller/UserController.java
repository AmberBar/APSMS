package com.apsms.controller;

import com.apsms.modal.User;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public User users(@RequestParam("username") String name,
                            @RequestParam("password") String password) {
        User user = userService.findUserByName(name, password);
        return user;
    }

    @GetMapping("/{name}")
    public List<User> findUserByName( @PathVariable("name") String name) {
        List users = userService.fuzzyQueryUsersByName(name);

        return users;
    }

    @PostMapping("")
    public User CreateUser(@Valid @RequestBody User user) {
        User newUser = userService.createUser(user);
        return newUser;
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
