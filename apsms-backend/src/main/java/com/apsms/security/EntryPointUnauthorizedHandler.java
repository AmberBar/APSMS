package com.apsms.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 自定401返回值
 *
 * @author hackyo
 * Created on 2017/12/9 20:10.
 */
@Component
@Service
public class EntryPointUnauthorizedHandler implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) {
        response.setHeader("Access-Control-Allow-Origin", "*");

        System.out.println("自定义了身份验证失败的返回值");
        response.setStatus(401);
    }

}