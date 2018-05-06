package com.apsms.modal.mall;

import com.apsms.modal.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="shopping_cart")
public class ShoppingCart implements Serializable {


    private static final long serialVersionUID = 4710411938721185647L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch=FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="user_id",referencedColumnName="id")
    private User user;

    @OneToMany(cascade={CascadeType.ALL, CascadeType.REMOVE},fetch=FetchType.EAGER)
    @JoinColumn(name = "shopping_cart_id", referencedColumnName = "id")
    private List<ShoppingList> shoppingLists;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ShoppingList> getShoppingLists() {
        return shoppingLists;
    }

    public void setShoppingLists(List<ShoppingList> shoppingLists) {
        this.shoppingLists = shoppingLists;
    }

    @Override
    public String toString() {
        return "ShoppingCart{" +
                "id=" + id +
                ", user=" + user +
                ", shoppingLists=" + shoppingLists +
                '}';
    }
}
