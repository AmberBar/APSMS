package com.apsms.controller;

import com.apsms.modal.User;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/users")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public List<User> users() {
        List<User> users = userService.queryAll();

        return users;
    }
}
