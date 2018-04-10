package com.apsms.service;

import com.apsms.modal.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public List<User> queryAll();
}
