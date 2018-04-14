package com.apsms.modal;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="user")
public class User {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "用户名不能为空")
    @Column(name="username")
    private String username;
    @NotBlank(message = "密码不能为空")
    @Column(name="password")
    private String password;
    @Column(name="is_admin")
    private boolean isAdmin;
    @Email(message = "email格式不正确")
    @Column(name="email")
    private String email;
    @Column(name="register_date")
    private Date regDate;
    @Column(name="phone", unique = true)
    private String phone;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", isAdmin=" + isAdmin +
                ", email='" + email + '\'' +
                ", regDate=" + regDate +
                ", phone='" + phone + '\'' +
                '}';
    }
}