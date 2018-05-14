package com.apsms.controller;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.apsms.configuration.AlipayConfig;
import com.apsms.modal.JsonResponse;
import com.apsms.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
@RequestMapping("/api/alipay")
public class AlipayController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/pay")
    public void alipay(
            HttpServletRequest req, Model mod, HttpServletResponse rep,
            @RequestParam("total_amount") String total_amount,
            @RequestParam("subject") String subject,
            @RequestParam("out_trade_no") String out_trade_no
    ) throws Exception{

        AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id, AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key, AlipayConfig.sign_type);

        //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();

        alipayRequest.setReturnUrl(AlipayConfig.return_url);
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url);
        alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
                + "\"total_amount\":\""+ total_amount +"\","
                + "\"subject\":\""+ subject +"\","
                + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");
        String result = null;
        try {
            //请求
            result = alipayClient.pageExecute(alipayRequest).getBody();

        } catch (Exception e) {
            e.printStackTrace();
        }
        //输出
        System.out.println(result);
        rep.setContentType("text/html;charset=" + AlipayConfig.charset);
        rep.getWriter().write(result);//直接将完整的表单html输出到页面
        rep.getWriter().flush();
        rep.getWriter().close();
    }

    @RequestMapping("/return")
    public JsonResponse index(
            HttpServletRequest request, HttpServletResponse response
    ) {
        try {
            Map<String, String> params = new HashMap<String, String>();
            Map<String, String[]> requestParams = request.getParameterMap();
            for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
                String name = (String) iter.next();
                System.out.println(name);
                String[] values = (String[]) requestParams.get(name);
                String valueStr = "";
                for (int i = 0; i < values.length; i++) {
                    valueStr = (i == values.length - 1) ? valueStr + values[i]
                            : valueStr + values[i] + ",";
                }

                System.out.println(valueStr);
                //乱码解决，这段代码在出现乱码时使用
                valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
                params.put(name, valueStr);
            }

            String out_trade_no =  new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"));
            orderService.updateOrderPaid(Integer.valueOf(out_trade_no));

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new JsonResponse(true, "change order success!");
    }
}
