package com.apsms.service.impl;

import com.apsms.modal.mall.Order;
import com.apsms.modal.user.User;
import com.apsms.modal.mall.ShoppingCart;
import com.apsms.modal.mall.ShoppingList;
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

    @Override
    public ShoppingList updateShoppingList(ShoppingList shoppingList) {
        User user = userService.getCurrentUser();
        shoppingList.setUser(user);
        ShoppingCart shoppingCart = shoppingCartService.getShoppingCartByUser(user);

        if (shoppingCart == null) {
            shoppingCart =  shoppingCartService.createShoppingCart(user);
        }

        System.out.println(shoppingList);
        ShoppingList oldShoppingList = shoppingListRepository.findByShoppingListByUserAndGoods(user.getId(), shoppingList.getGoods().getId());

        System.out.println("/////////////////");
        if (oldShoppingList == null) {
            shoppingListRepository.save(shoppingList);
        } else {
            int num = shoppingList.getNumber() + oldShoppingList.getNumber();
            oldShoppingList.setNumber(num);
            shoppingListRepository.save(oldShoppingList);
        }

        System.out.println("/////////////////");
        List<ShoppingList> shoppingLists = shoppingListRepository.findAllByUser(user.getId());
        shoppingCart.setShoppingLists(shoppingLists);
        shoppingCartRepository.save(shoppingCart);
        System.out.println("/////////////////");
        return shoppingList;
    }

    @Override
    public ShoppingList createShoppingList(ShoppingList shoppingList) {
        User user = userService.getCurrentUser();
        shoppingList.setUser(user);

        return shoppingListRepository.save(shoppingList);
    }

    @Override
    public ShoppingList getById(Integer id) {
        ShoppingList shoppingList = shoppingListRepository.findOne(id);
        return shoppingList;
    }


    @Override
    public Page<ShoppingList> queryAll(String name, int pageNumber, int pageSize) {


        final User currentUser = userService.getCurrentUser();

        Pageable pageable=new PageRequest(pageNumber, pageSize);

        Specification<ShoppingList> spec = new Specification<ShoppingList>() {

            @Override
            public Predicate toPredicate(Root<ShoppingList> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                Path<User> user = root.get("user");

                Path<Integer> order = root.get("order");

                Predicate p1 = cb.equal(user,  currentUser);
                System.out.println("*********************");
                System.out.println(order);

                Predicate p2 = cb.isNull(order.get("id"));

//                Predicate p2 = cb.like(id,   name );

                Predicate p = cb.and(p1, p2);

                return p;
            }
        };
        return shoppingListRepository.findAll(spec, pageable);
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
}
