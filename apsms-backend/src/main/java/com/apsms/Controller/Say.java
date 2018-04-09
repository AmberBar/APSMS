package com.apsms.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/say")
public class Say {

    @RequestMapping("")
    public String say() {
        return "hello";
    }
}
