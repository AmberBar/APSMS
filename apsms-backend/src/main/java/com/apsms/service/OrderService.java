package com.apsms.service;

import com.apsms.modal.mall.Goods;
import com.apsms.modal.mall.Order;
import com.apsms.modal.user.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    Order createOrder(Order order);

    List<Order> orders(User user);

    Page<Order> queryAll(final String name, int pageNumber, int pageSize);
}
