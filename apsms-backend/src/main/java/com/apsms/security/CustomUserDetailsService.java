package com.apsms.security;

import com.apsms.modal.User;
import com.apsms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("userDetailsService")
public class CustomUserDetailsService  implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.checkLogin(username);
        System.out.println(">>>>>>>>>>>>>>>>user>>>>>>>>>>>>>>>>>>>>>>>");
        System.out.println("username:"+user.getUsername()+";password:"+user.getPassword());
        if(user == null){
            throw new UsernameNotFoundException("user not found");
        }

        return user;
        }
    }
