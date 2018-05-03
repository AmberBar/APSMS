package com.apsms.filter;

import com.apsms.modal.Constant;
import com.apsms.modal.JsonResponse;
import com.apsms.modal.ResultInfo;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

@WebFilter(filterName="CorsFilter",urlPatterns="/*")
public class CorsFilter implements Filter {

    private static Logger logger = LoggerFactory
            .getLogger(CorsFilter.class);


    @Override
    public void init(FilterConfig arg0) throws ServletException {
        System.out.println("............................MyFilter init............");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type,Access-Token,X-Requested-With");
        response.setHeader("Access-Control-Expose-Headers", "*");

        if (request.getMethod().equals("OPTIONS")) {

            response.setStatus(HttpServletResponse.SC_OK);
            System.out.println("option");
            return;
        }

        System.out.println("==========================================");
        chain.doFilter(req, res);

    }

    @Override
    public void destroy() {
        System.out.println(" ..........................CorsFilter destroy..........");
    }
}