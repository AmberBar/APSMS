package com.apsms.security;

import com.apsms.modal.JwtUser;
import com.apsms.modal.Role;
import com.apsms.modal.User;
import com.apsms.repository.UserRepository;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Component
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    private UserService userService;

    @Autowired
    public JwtUserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userService.checkLogin(username);

        if(user == null){
            throw new UsernameNotFoundException("user not found");
        }

        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        for (Role role : user.getRoles()) {
            System.out.println(role);
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        System.out.println(">>>>>>>>>>>>>>>>user>>>>>>>>>>>>>>>>>>>>>>>");
        System.out.println("username:"+user.getUsername()+";password:"+user.getPassword());

        return new JwtUser(user.getUsername(), user.getPassword(), authorities);
    }

}
