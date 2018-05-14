package com.apsms.configuration;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {

//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016091500515803";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDFBnssXonTHnTZvYkQvWuETc5EfV980mXHwjbkes1aVZwPV7vhpBo+vj6xCQL0+FbZoH90KIl+SUSp08LadFJQzpn5Y3VXG4p1oBrdQEAipS3cFM8caqBWgMUS3miklzaYhHm1C01sRrbCWgDDB0shO8tahgLc2uBhK6jlk1eOE5SIo0jqJhh4J2TVXuN9++COOjNnkpGIrJ1PgbGafP4KoQUQtjD4NPWhdcjqtm3TEizvd5i/4kzYmyfJsCzl4UrYf0xA0e1//fIQQe0GBRAMETnFRsAMsPjSj97AdquDjN4nKcRMssQX/d0LnxcLYMdAkQcABRITKqZddSn89/0ZAgMBAAECggEAJcrfd5xOvaNa8KVNlFtxMzildzfBSDUndtDHLL5tg4VmYP8IN/j9W8msRtMesRStvCLwL7zS2tl9BUJsXvDvFTb8C/1K9cF/pp5maMg5RSwABvYq4B2H0e/zXXIyClhDDbBjlBmt6TYLOm5/NOnCPIa2tA9+nxSQ87KnPBouMj8yf3zTKr2Wc1ScDzLPF3ScFzbUU38udqwMZI22VK6VS0dKixk0bPi5MO/WQYfO3YkkK5I+xaMnDz3r1JpTwAzhXiuG3BmyVmMSOzNfVF6HL5kpMsmfJYA6obqY/qORJTgO+TrKknUoi0GdwLJ4/Tbeu/kWbZX3QnUiTuzMqvptsQKBgQD8fNftlLkugnHuDBdCujETNEHOPbKYPIOOIikweq4DK8fTIZ1cHJBlBkOkPdw8Qxp1yv5j5WXa1iK0s5F5N3GrVFeXR27N6J6HnPldJmntLkyZ8qJgw1OpVlzY32qy5agJ/YIJkGBkaPb2ytzOeWV8PJmu05ccz03R5LjhUhs4RQKBgQDHxCAuZgHLK6xP/wDqyKUd9QFtCbWTepSkiYhsjFomeS2By4FZ1V4Z2S8vvvR0nXgT6GkclOHi4Y/oZQdLy5W8kzoTL+lbLPX07Be8531p0CMjqZyS8sm/cvg3ZnuXqqNFpbL5flFgOZ+SFK+YbNcGc7V6XzXL4EsbirxAXQHwxQKBgFnTwK6RvuBBIG9kddITk+oVKWRKpwNqZBNpK+ZHfyk5pjoDN4zRzL1kYSRJrdTyurM1qRO5RWd5z5ciW5sYkqQ1uYPkshMns17kBgOR6xWq5y3OGN78HwOb6iRuN/O1qPcE7gKhDuoqPdLHkY8TuXtdw/9i39wsFK+cA/qFz5FRAoGAddBSVmrspeEk56zx4oXg85D6fU8bmlXR8lP2dGY2CLiwwPq/V7bBn6b58EPDMj9ogP0xeJzJt5/l2l4y9l2j+qottwErtA0JJaBTw6IW0d/hyXePkw7DMzjf8PRs8Z6+WiYGLqRz47c4R9QRV2jhS7nUDs62EH5AbYbdzWvM6C0CgYAwLM68w3NLVmlK7D7xXBx94GLTXzR6SiePkX/ICCt2B5ES6UBL2FzmjWR+GS0P59QDTZAlqQmlZonLn3wxk9pwrZeCHc4BelttQF/80AXNXa8JPNYtKi0NQqHknQWyq9mgwpZAdstf9Pn2Ru7lJbjB6kr+kLa2TCReUYX9lxVcMg==";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxFNcfrKr42O6CCsSKQTybaSecUuv5yRUnwuhdCu1SK5+HL7grwl/gFsfXk02DD1raWpC+Scp2CNKmR47tf8rUdZuGCDFYM8OqwO+rtGwypT3/ho2gX9woHTqb1UC2in913gbsjTTm+Os8qUCuC6hiJVaSU69ehZ7ifMc4yZyRrrw3JZXi6eRThp0zoXIeLaLz+rwgY7wtUvZbLkU5IPgvHwyJb7ZTV7K2HToeiNOCLannYlZxqiUB+SSNCjQbMySM3ejwBb446A7PRTbeUcWXcv1qG3K2WpBqJzTPWXkh7go/spSjFSWaSMFjsFnx4EI+3awmQQzCJfRnTv2mzWApQIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://apsms.free.ngrok.cc/#/alipay/notify";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "http://apsms.free.ngrok.cc/#/alipay/return";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}


