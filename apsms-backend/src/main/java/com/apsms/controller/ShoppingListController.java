package com.apsms.controller;

import com.apsms.modal.JsonResponse;
import com.apsms.modal.mall.ShoppingList;
import com.apsms.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoppingList")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    @PutMapping("/updateCard")
    public JsonResponse updateCard(
            @RequestBody ShoppingList shoppingList
    ) {
        shoppingListService.updateShoppingList(shoppingList);
        System.out.println(shoppingList);
        return new JsonResponse(true, "add success!");
    }

    @PostMapping("/buyNow")
    public JsonResponse buyNow(
            @RequestBody ShoppingList shoppingList
    ) {
        return new JsonResponse(true, shoppingListService.createShoppingList(shoppingList));
    }

    @RequestMapping("/get")
    public JsonResponse getShoppingListById( @RequestParam("id") Integer id) {
        ShoppingList shoppingList = shoppingListService.getById(id);
        return new JsonResponse(true, shoppingList);
    }

    @GetMapping("/findAll")
    public JsonResponse findAll(
            @RequestParam("name") String name,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
    ) {
        return new JsonResponse(true, shoppingListService.queryAll(name, pageNumber, pageNumber));
    }
}
