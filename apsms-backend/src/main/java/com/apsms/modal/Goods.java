package com.apsms.modal;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="auto_parts")
public class Goods implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    @NotBlank(message = "商品名不能为空")
    @Column(name = "name")
    private String name;

    @Column(name="parts_price")
    private Double price;

    @Column(name="parts_brand")
    private String brand;

    @OneToMany
    @JoinColumn(name = "parts_img", referencedColumnName = "id")
    private List<Img> imgs;

    @Column(name="parts_discription")
    private String discription;

    @Column(name="create_date")
    private Date createDate;
    @Column(name="parts_type")
    private String type;

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

//    public List<String> getImg() {
//        return img;
//    }
//
//    public void setImg(List<String> img) {
//        this.img = img;
//    }
}
