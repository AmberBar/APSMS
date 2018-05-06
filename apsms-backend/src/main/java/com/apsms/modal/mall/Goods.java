package com.apsms.modal.mall;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="goods")
public class Goods implements Serializable {

    private static final long serialVersionUID = 1377742192916480637L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @NotBlank(message = "商品名不能为空")
    @Column(name = "name")
    private String name;

    @Column(name="parts_price")
    private Double price;

    @Column(name="parts_brand")
    private String brand;

//    @OneToMany(cascade={CascadeType.ALL, CascadeType.REMOVE},fetch=FetchType.EAGER)
    @OneToMany(cascade={CascadeType.ALL})
    @JoinColumn(name = "goods_id", referencedColumnName = "id")
    private List<Img> imgs;

    @Column(name="parts_discription")
    private String discription;
    @Column(name="create_date")
    private Date createDate;
    @Column(name="parts_type")
    private String type;
    @Column(name="sales")
    private int sales;

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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public List<Img> getImgs() {
        return imgs;
    }

    public void setImgs(List<Img> imgs) {
        this.imgs = imgs;
    }

    public int getSales() {
        return sales;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }

    @Override
    public String toString() {
        return "Goods{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", brand='" + brand + '\'' +
                ", imgs=" + imgs +
                ", discription='" + discription + '\'' +
                ", createDate=" + createDate +
                ", type='" + type + '\'' +
                '}';
    }
}
