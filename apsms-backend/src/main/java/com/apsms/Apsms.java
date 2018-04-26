package com.apsms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@ServletComponentScan
@EnableWebSecurity
public class Apsms {

    public static void main(String[] args) {
        SpringApplication.run(Apsms.class, args);
    }

}
