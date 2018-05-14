package com.apsms.service;

import com.apsms.modal.mall.Order;
import com.apsms.modal.mall.ShoppingCart;
import com.apsms.modal.mall.ShoppingList;
import com.apsms.modal.user.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShoppingListService {

    public ShoppingList updateShoppingList(ShoppingList shoppingList);

    ShoppingList createShoppingList(ShoppingList shoppingList);

    ShoppingList getById(Integer id);

    ShoppingList updateNumber(Integer id, int number);

    void delete(Integer id);

    List<ShoppingList> findAllByIds(List<Integer> ids);

    Page<ShoppingList> findAll(String name, int pageNumber, int pageSize);
}