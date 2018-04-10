package com.apsms.modal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="User")
public class User {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="id")
    private Integer id;
    @Column(name="name")
    private String name;
    @Column(name="password")
    private String password;
    @Column(name="address_name")
    private String adrName;
    @Column(name="phone")
    private String phone;
    @Column(name="address")
    private String address;
    @Column(name="address_code")
    private String adrCode;
    @Column(name="is_admin")
    private Boolean isAdmin;
    @Column(name="email")
    private String email;
    @Column(name="register_date")
    private Date regDate;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAdrName() {
        return adrName;
    }

    public void setAdrName(String adrName) {
        this.adrName = adrName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAdrCode() {
        return adrCode;
    }

    public void setAdrCode(String adrCode) {
        this.adrCode = adrCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", adrName='" + adrName + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", adrCode='" + adrCode + '\'' +
                ", email='" + email + '\'' +
                ", regDate=" + regDate +
                '}';
    }
}