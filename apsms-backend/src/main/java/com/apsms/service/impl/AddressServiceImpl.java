package com.apsms.service.impl;

import com.apsms.modal.user.Address;
import com.apsms.modal.user.User;
import com.apsms.repository.AddressRepository;
import com.apsms.service.AddressService;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;


    @Autowired
    UserService userService;

    @Override
    public List<Address> findAll() {
       User currentUser =  userService.getCurrentUser();
       List<Address> addresses = currentUser.getAddresses();
        return addresses;
    }
}
