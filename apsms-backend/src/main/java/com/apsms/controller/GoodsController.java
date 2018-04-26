package com.apsms.controller;

import com.apsms.modal.Goods;
import com.apsms.modal.JsonResponse;
import com.apsms.service.GoodService;
import org.omg.CORBA.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.*;

@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    @Autowired
    private GoodService goodService;


    @Value("${upload.img.url}")
    private String url;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public JsonResponse createGoods(@Valid Goods goods) {

       Goods newGoods = goodService.createGood(goods);
        return new JsonResponse(true, newGoods);
    }

    @RequestMapping(value = "/upload/img")
    public JsonResponse upload(
            @RequestParam("file") MultipartFile file

                              ) {
        System.out.println("BBBBBBBBBBBBBBBBB");
//        System.out.println(s);
//        if (!file.isEmpty()) {
//            try {
//                /*
//                 * 这段代码执行完毕之后，图片上传到了工程的跟路径； 大家自己扩散下思维，如果我们想把图片上传到
//                 * d:/files大家是否能实现呢？ 等等;
//                 * 这里只是简单一个例子,请自行参考，融入到实际中可能需要大家自己做一些思考，比如： 1、文件路径； 2、文件名；
//                 * 3、文件格式; 4、文件大小的限制;
//                 */
//                BufferedOutputStream out = new BufferedOutputStream(
//                        new FileOutputStream(new File(
//                                url + file.getOriginalFilename())));
//                System.out.println(file.getName());
//                out.write(file.getBytes());
//                out.flush();
//                out.close();
//            } catch (FileNotFoundException e) {
//                e.printStackTrace();
//                return new JsonResponse(false, e.getMessage());
//            } catch (IOException e) {
//                e.printStackTrace();
//                return new JsonResponse(false, e.getMessage());
//            }
//
//            return new JsonResponse(true, "上传成功");
//
//        } else return new JsonResponse(true, "上传失败，因为文件是空的.");
//
        return new JsonResponse(true, "123");

    }
}
