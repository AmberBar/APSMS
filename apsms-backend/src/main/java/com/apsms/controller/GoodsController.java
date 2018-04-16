package com.apsms.controller;

import com.apsms.modal.Goods;
import com.apsms.modal.JsonResponse;
import com.apsms.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    @Autowired
    private GoodService goodService;

//    @PreAuthorize("hasAnyAuthority('1')")
    @PostMapping("/create")
    public JsonResponse createGoods(@Valid Goods goods) {

       Goods newGoods = goodService.createGood(goods);
        return new JsonResponse(true, newGoods);
    }
}
