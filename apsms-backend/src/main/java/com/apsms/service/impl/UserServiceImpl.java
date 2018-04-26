package com.apsms.service.impl;

import com.apsms.modal.JsonResponse;
import com.apsms.modal.Role;
import com.apsms.modal.User;
import com.apsms.repository.RoleRepository;
import com.apsms.repository.UserRepository;
import com.apsms.service.UserService;
import com.apsms.utils.JwtTokenUtil;
import com.apsms.utils.Md5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public Page<User> queryAll(final User param, int pageNumber,int pageSize) {
//        List<User> users = new ArrayList<User>();
//        users = userRepository.findAll();
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
    public User checkLogin(String username) {

        return userRepository.checkLogin(username);
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
//        password = Md5Util.EncoderByMd5(password);
//        user.setPassword(password);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = user.getPassword();
        user.setPassword(encoder.encode(rawPassword));
//        System.out.println("**************************************");
//        System.out.print(user);
        List<Role> roles = user.getRoles();
        for (Role role: roles) {
            roleRepository.save(role);
        }
        User newUser =  userRepository.save(user);

        return newUser;
    }

    @Override
    @Transactional
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User updateUser(User user) {
        User newUser = userRepository.save(user);
        return newUser;
    }

    @Override
    public String refreshToken(String oldToken) {
        String token = oldToken.substring("Bearer ".length());
        if (!jwtTokenUtil.isTokenExpired(token)) {
            return jwtTokenUtil.refreshToken(token);
        }
        return "error";
    }
}
