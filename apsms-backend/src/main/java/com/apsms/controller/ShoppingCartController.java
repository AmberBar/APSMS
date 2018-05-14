package com.apsms.controller;

import com.apsms.modal.JsonResponse;
import com.apsms.modal.mall.ShoppingCart;
import com.apsms.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shoppingCart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping("/findAll")
    public JsonResponse findAll(
            @RequestParam("name") String name,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
    ) {
        return new JsonResponse(true, shoppingCartService.queryAll(name, pageNumber, pageSize));
    }

    @DeleteMapping("/clearCart")
    public JsonResponse clearCart( ) {
        shoppingCartService.clearCart();
        return new JsonResponse(true, "clear cart success");
    }
}
