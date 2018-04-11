package com.apsms.service;

import com.apsms.modal.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public interface UserService {

    public List<User> queryAll();

    public List<User> findUserByName(String name);

    public User  createUser(User user);

    public void deleteUserByName(String name);

    public User updateUser(User user);
}
