package com.apsms.controller;

import com.apsms.modal.Goods;
import com.apsms.modal.JsonResponse;
import com.apsms.modal.User;
import com.apsms.service.GoodService;
import org.omg.CORBA.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.*;
import java.util.Date;

@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    @Autowired
    private GoodService goodService;


    @Value("${upload.img.url}")
    private String url;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public JsonResponse createGoods(@Valid @RequestBody Goods goods) {
        goods.setCreateDate(new Date());
        System.out.println(goods);
        Goods newGoods = goodService.createGood(goods);
        return new JsonResponse(true, newGoods);
    }

    @GetMapping("/getGoods")
    public JsonResponse getGoods(@RequestParam("id") Integer id) {
        Goods newGoods = goodService.getGoodsById(id);
        return new JsonResponse(true, newGoods);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public JsonResponse delete(@Valid @RequestBody Goods goods) {
        goodService.delete(goods);
        return new JsonResponse(true, "delete success");
    }

    @PostMapping("/findAll")
    public JsonResponse createGoods(
            @RequestParam(value = "name") String name,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
    ) {
        Goods goods = new Goods();
        goods.setName(name);
        Page<Goods> goodsList= goodService.queryAll(  goods, pageNumber, pageSize);
        System.out.print(goodsList);
        return new JsonResponse(true, goodsList);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/upload/img")
    public JsonResponse upload(
            @RequestParam(value = "file", required = false) MultipartFile file
                              ) {

        if (!file.isEmpty()) {
            try {
                BufferedOutputStream out = new BufferedOutputStream(
                        new FileOutputStream(new File(
                                "./src/main/resources/static/imgs/" + file.getOriginalFilename())));
                out.write(file.getBytes());
                out.flush();
                out.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                return new JsonResponse(false, e.getMessage());
            } catch (IOException e) {
                e.printStackTrace();
                return new JsonResponse(false, e.getMessage());
            }

            return new JsonResponse(true, "上传成功");

        }
        else return new JsonResponse(false, "上传失败，因为文件是空的.");
    }
}
