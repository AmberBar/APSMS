package com.apsms.modal.mall;

import com.apsms.modal.user.Address;
import com.apsms.modal.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="tb_order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="pay_date")
    private Date payDate;

    @Column(name="total")
    private double total;

    private String status;

    @OneToOne(cascade = CascadeType.ALL )
    @JoinColumn(name="user_id",referencedColumnName="id")
    private User user;

    @Column(name="create_date")
    private Date createDate;

    @OneToMany(cascade={CascadeType.MERGE} )
    @JoinColumn(name = "shoppingList_id", referencedColumnName = "id")
    private List<ShoppingList> shoppingLists;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="address_id",referencedColumnName="id")
    private Address address;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date payDate) {
        this.payDate = payDate;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public List<ShoppingList> getShoppingLists() {
        return shoppingLists;
    }

    public void setShoppingLists(List<ShoppingList> shoppingLists) {
        this.shoppingLists = shoppingLists;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", payDate=" + payDate +
                ", total=" + total +
                ", status='" + status + '\'' +
                ", user=" + user +
                ", createDate=" + createDate +
                ", shoppingLists=" + shoppingLists +
                ", address=" + address +
                '}';
    }
}
