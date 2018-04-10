package com.apsms.service.impl;

import com.apsms.modal.User;
import com.apsms.repository.UserRepository;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> queryAll() {
        List<User> users = new ArrayList<User>();
        users = userRepository.findAll();
        return users;
    }
}
