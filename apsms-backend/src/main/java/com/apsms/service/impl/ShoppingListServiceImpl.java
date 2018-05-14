package com.apsms.service.impl;

import com.apsms.modal.mall.Goods;
import com.apsms.modal.mall.Order;
import com.apsms.modal.user.User;
import com.apsms.modal.mall.ShoppingCart;
import com.apsms.modal.mall.ShoppingList;
import com.apsms.repository.GoodsRepository;
import com.apsms.repository.ShoppingCartRepository;
import com.apsms.repository.ShoppingListRepository;
import com.apsms.service.ShoppingCartService;
import com.apsms.service.ShoppingListService;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ShoppingListServiceImpl implements ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    @Autowired
    UserService userService;

    @Autowired
    ShoppingCartService shoppingCartService;

    @Autowired
    GoodsRepository goodsRepository;

    @Override
    public ShoppingList updateShoppingList(ShoppingList shoppingList) {
        User user = userService.getCurrentUser();
        shoppingList.setUser(user);
        ShoppingCart shoppingCart = shoppingCartService.getShoppingCartByUser(user);

        if (shoppingCart == null) {
            shoppingCart =  shoppingCartService.createShoppingCart(user);
        }

        ShoppingList oldShoppingList = shoppingListRepository.findByShoppingListByUserAndGoods(user.getId(), shoppingList.getGoods().getId());

        if (oldShoppingList == null) {
            shoppingListRepository.save(shoppingList);
        } else {
            int num = shoppingList.getNumber() + oldShoppingList.getNumber();
            oldShoppingList.setNumber(num);
            shoppingListRepository.save(oldShoppingList);
        }

        List<ShoppingList> shoppingLists = shoppingListRepository.findAllByUser(user.getId());
        shoppingCart.setShoppingLists(shoppingLists);
        shoppingCartRepository.save(shoppingCart);

        return shoppingList;
    }

    @Override
    public ShoppingList createShoppingList(ShoppingList shoppingList) {
        User user = userService.getCurrentUser();
        shoppingList.setUser(user);
        Goods goods = goodsRepository.findOne(shoppingList.getGoods().getId());
        int num = goods.getStock() - shoppingList.getNumber();
        goods.setStock(num);
        return shoppingListRepository.save(shoppingList);
    }

    @Override
    public ShoppingList getById(Integer id) {
        ShoppingList shoppingList = shoppingListRepository.findOne(id);
        return shoppingList;
    }

    @Override
    public ShoppingList updateNumber(Integer id, int number) {

        ShoppingList shoppingList = shoppingListRepository.findOne(id);
        shoppingList.setNumber(number);

        return shoppingListRepository.save(shoppingList);
    }

    @Override
    public void delete(Integer id) {
        shoppingListRepository.delete(id);
    }

    @Override
    public List<ShoppingList> findAllByIds(List<Integer> ids) {
        List<ShoppingList> shoppingLists = new ArrayList<ShoppingList>();
        for (Integer id : ids) {
            ShoppingList shoppingList = shoppingListRepository.findOne(id);
            shoppingLists.add(shoppingList);
        }
        return shoppingLists;
    }

    @Override
    public Page<ShoppingList> findAll(String name, int pageNumber, int pageSize) {
        User user = userService.getCurrentUser();
        Pageable pageable = new PageRequest(pageNumber,pageSize);
        Page<ShoppingList> page = shoppingListRepository.findShoppingListByUserPageable(name, user.getId(),pageable);

        return page;
    }
}
