package com.apsms.repository;

import com.apsms.modal.mall.ShoppingCart;
import com.apsms.modal.user.User;
import com.apsms.modal.mall.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Integer>, JpaSpecificationExecutor<ShoppingList> {

    public List<ShoppingList> findAllByUser(User user);

    @Query(value = "select * from shopping_list where user_id=?1 and goods_id=?2", nativeQuery = true)
    public ShoppingList findByShoppingListByUserAndGoods(Integer userId, Integer goodsId);
}
