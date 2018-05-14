package com.apsms.modal.user;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="user")
public class User implements Serializable {

    private static final long serialVersionUID = 335175666014741380L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "用户名不能为空")
    @Column(name="username", unique = true)
    private String username;
    @NotBlank(message = "密码不能为空")
    @Column(name="password")
    private String password;
    @Email(message = "email格式不正确")
    @Column(name="email")
    private String email;
    @Column(name="register_date")
    private Date regDate;
    @Column(name="phone")
    private String phone;

    @OneToMany(cascade={CascadeType.ALL},fetch=FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Role> roles;

    @OneToMany(cascade={CascadeType.ALL, CascadeType.REMOVE})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Address> addresses;

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}