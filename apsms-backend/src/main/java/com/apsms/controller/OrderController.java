package com.apsms.controller;

import com.apsms.modal.JsonResponse;
import com.apsms.modal.mall.Order;
import com.apsms.modal.user.User;
import com.apsms.service.OrderService;
import com.apsms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    @PostMapping("create")
    public JsonResponse create(
            @RequestBody Order order
    ) {
        return new JsonResponse(true, orderService.createOrder(order));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/findAll")
    public JsonResponse findAll(
            @RequestParam("name") String name,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
    ) {

        return new JsonResponse(true, orderService.queryAll(name,pageNumber, pageSize ));
    }

    @GetMapping("/findAllOrders")
    public JsonResponse findAllOrder(
            @RequestParam("name") String name,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
    ) {
        return new JsonResponse(true, orderService.findAllOrders(name,pageNumber, pageSize ));
    }

    @GetMapping("/delivery")
    public JsonResponse delivery(
            @RequestParam("id") int id
    ) {
        return new JsonResponse(true, orderService.delivery(id));
    }
}
