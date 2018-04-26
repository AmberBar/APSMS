package com.apsms.modal;

import javax.persistence.*;

@Entity
@Table(name="img")
public class Img {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="img_srcs")
    private String img;
}
