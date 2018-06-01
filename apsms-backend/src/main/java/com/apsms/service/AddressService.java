package com.apsms.service;

import com.apsms.modal.user.Address;
import com.apsms.modal.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AddressService {

    List<Address> findAll();

    void createAddress(Address address);

    void deleteAddress(Integer id);
}
