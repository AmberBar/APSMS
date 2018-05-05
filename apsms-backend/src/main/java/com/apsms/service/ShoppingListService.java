package com.apsms.service;

import com.apsms.modal.mall.Order;
import com.apsms.modal.mall.ShoppingCart;
import com.apsms.modal.mall.ShoppingList;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface ShoppingListService {

    public ShoppingList updateShoppingList(ShoppingList shoppingList);

    ShoppingList createShoppingList(ShoppingList shoppingList);

    ShoppingList getById(Integer id);

    Page<ShoppingList> queryAll(final String name, int pageNumber, int pageSize);
}