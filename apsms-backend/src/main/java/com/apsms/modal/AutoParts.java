package com.apsms.modal;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class AutoParts {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;

    @NotBlank(message = "商品名不能为空")
    @Column(name = "name")
    private String name;

    @Column(name="parts_price")
    private Double price;

    @Column(name="parts_img")
    private String img;

    @Column(name="parts_discription")
    private String discription;

    @Column(name="parts_type")
    private String type;
}
