package com.apsms.service.impl;

import com.apsms.modal.mall.Order;
import com.apsms.modal.user.User;
import com.apsms.repository.OrderRepository;
import com.apsms.service.OrderService;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserService userService;

    @Override
    public Order createOrder(Order order) {
        User user = userService.getCurrentUser();
        order.setUser(user);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> orders(User user) {
        return orderRepository.findAllByUser(user);
    }

    @Override
    public Page<Order> queryAll(final String name, int pageNumber, int pageSize) {

        final User currentUser = userService.getCurrentUser();

        Pageable pageable=new PageRequest(pageNumber, pageSize);

        Specification<Order> spec = new Specification<Order>() {

            @Override
            public Predicate toPredicate(Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                Path<User> user = root.get("user");

                Path<Integer> id = root.get("id");

                Predicate p1 = cb.equal(user,  currentUser);

//                Predicate p2 = cb.like(id,   name );

                Predicate p = cb.and(p1);

                return p;
            }
        };
        return orderRepository.findAll(spec, pageable);
    }
}
