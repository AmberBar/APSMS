package com.apsms.service.impl;

import com.apsms.modal.User;
import com.apsms.repository.UserRepository;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    @Override
    public List<User> checkLogin(User user) {
//        userRepository.findByName(name);
        return null;
    }

    @Override
    public User findUserByName(String name) {
        return userRepository.checkLogin(name);
    }

    @Override
    public List<User> fuzzyQueryUsersByName(String name) {
        List users = userRepository.fuzzyQueryByName(name);
        return users;
    }

    @Transactional
    @Override
    public User createUser(User user) {
       User newUser =  userRepository.save(user);
       return newUser;
    }

    @Override
    public void deleteUserByName(String name) {
        userRepository.delete(name);
    }

    @Override
    public User updateUser(User user) {
        User newUser = userRepository.save(user);
        return newUser;
    }
}
