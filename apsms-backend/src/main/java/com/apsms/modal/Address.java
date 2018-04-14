package com.apsms.modal;

import javax.persistence.Column;

public class Address {

    @Column(name="address_name")
    private String adrName;
    @Column(name="address")
    private String address;
    @Column(name="address_code")
    private String adrCode;
    @Column(name="address_phone")
    private String adrPhone;
    @Column(name="username")
    private String username;
}
