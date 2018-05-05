package com.apsms.modal.mall;

import com.apsms.modal.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "shopping_list")
public class ShoppingList implements Serializable {


    private static final long serialVersionUID = 1602365938128583667L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //referencedColumnName：参考列名,默认的情况下是列表的主键
    //nullable=是否可以为空，
    //insertable：是否可以插入，
    //updatable：是否可以更新
    // columnDefinition=列定义，
    //foreignKey=外键
//    @OneToOne(fetch=FetchType.LAZY,cascade = CascadeType.REFRESH)

//    @OneToOne( cascade = CascadeType.MERGE)


    @Column(name="number")
    private int number;

    @Column(name="sum")
    private double sum;

//    @OneToOne(fetch=FetchType.EAGER,cascade = CascadeType.MERGE)

    @OneToOne( cascade = CascadeType.MERGE)
    @JoinColumn(name="user_id",referencedColumnName="id")
    private User user;

    @OneToOne( cascade = CascadeType.MERGE)
    @JoinColumn(name="goods_id",referencedColumnName="id")
    private Goods goods;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public double getSum() {
        return number * goods.getPrice();
    }

//    public void setSum(double sum) {
//        this.sum = sum;
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ShoppingList{" +
                "id=" + id +
                ", goods=" + goods +
                ", number=" + number +
                ", sum=" + sum +
                ", user=" + user +
                '}';
    }
}
