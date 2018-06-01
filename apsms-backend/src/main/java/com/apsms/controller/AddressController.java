package com.apsms.controller;

import com.apsms.modal.JsonResponse;
import com.apsms.modal.user.Address;
import com.apsms.service.AddressService;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping("/findAll")
    public JsonResponse findAll() {
        List<Address> addresses = addressService.findAll();
        return new JsonResponse(true, addresses);
    }

    @PostMapping("/createAddress")
    public JsonResponse createAddress(@RequestBody Address address) {
        addressService.createAddress(address);
        return new JsonResponse(true, null);
    }

    @DeleteMapping("/deleteAddress")
    public JsonResponse deleteAddress(@RequestParam("id") Integer id) {
        addressService.deleteAddress(id);
        return new JsonResponse(true, null);
    }
}
