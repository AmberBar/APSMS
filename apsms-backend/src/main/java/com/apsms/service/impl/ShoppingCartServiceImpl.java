package com.apsms.service.impl;

import com.apsms.modal.mall.Order;
import com.apsms.modal.mall.ShoppingList;
import com.apsms.modal.user.User;
import com.apsms.modal.mall.ShoppingCart;
import com.apsms.repository.ShoppingCartRepository;
import com.apsms.service.ShoppingCartService;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.List;

@Transactional
@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private UserService userService;

    @Override
    public ShoppingCart getShoppingCartByUser(User user) {
        return shoppingCartRepository.findByUser(user);
    }

    @Override
    public ShoppingCart createShoppingCart(User user) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUser(user);
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart updateShoppingCart(ShoppingCart shoppingCart) {
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public Page<ShoppingCart> queryAll(final String name, int pageNumber, int pageSize) {


        final User currentUser = userService.getCurrentUser();

        Pageable pageable=new PageRequest(pageNumber, pageSize);

        Specification<ShoppingCart> spec = new Specification<ShoppingCart>() {

            @Override
            public Predicate toPredicate(Root<ShoppingCart> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                Path<User> user = root.get("user");
                System.out.println(name);
                Predicate p1 = cb.equal(user,  currentUser);
                System.out.println("*************************");
                System.out.println(root.join("shoppingLists").join("goods").get("name").as(String.class));
                Predicate p2 = cb.like(root.join("shoppingLists").join("goods").get("brand").as(String.class), "%" + name + "%");

                Predicate p = cb.and(p2, p1);

                return p;
            }
        };
        return shoppingCartRepository.findAll(spec, pageable);
    }
}
