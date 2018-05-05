package com.apsms.service;

import com.apsms.modal.mall.Order;
import com.apsms.modal.user.User;
import com.apsms.modal.mall.ShoppingCart;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface ShoppingCartService {

    ShoppingCart getShoppingCartByUser(User user);

    ShoppingCart createShoppingCart(User user);

    ShoppingCart updateShoppingCart(ShoppingCart shoppingCart);
}
