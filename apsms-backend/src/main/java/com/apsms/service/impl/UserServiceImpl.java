package com.apsms.service.impl;

import com.apsms.modal.User;
import com.apsms.repository.UserRepository;
import com.apsms.service.UserService;
import com.apsms.utils.Md5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<User> queryAll(final User param, int pageNumber,int pageSize) {
//        List<User> users = new ArrayList<User>();
//        users = userRepository.findAll();
        System.out.println("><><><><><><><><param><><><><><><><><><><");
        Pageable pageable=new PageRequest(pageNumber, pageSize);  //分页信息

        Specification<User> spec = new Specification<User>() {        //查询条件构造

        @Override
        public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

            Path<String> name = root.get("username");

            Predicate p1 = cb.like(name, "%"+param.getUsername()+"%");

            Predicate p = cb.and(p1);

            return p;
        }
        };

        return userRepository.findAll(spec, pageable);
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
    public User createUser(User user) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        user.setRegDate(new Date());
        String password = user.getPassword();
        password = Md5Util.EncoderByMd5(password);
        user.setPassword(password);
        System.out.println("**************************************");
        System.out.print(user);

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
