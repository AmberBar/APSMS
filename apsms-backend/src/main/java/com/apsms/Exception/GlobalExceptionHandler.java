package com.apsms.Exception;

import com.apsms.modal.JsonResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@ControllerAdvice
public class GlobalExceptionHandler implements ApplicationContextAware {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    @ExceptionHandler(value = Exception.class)//处理所有异常
    @ResponseBody
    public JsonResponse exceptionHandler(Exception exception, HttpServletResponse response) {
        System.out.println(exception);
        return new JsonResponse(false, exception.getMessage());
    }

    @ExceptionHandler(value = UserNotExistExcepion.class)
    @ResponseBody
    public JsonResponse exceptionHandler(UserNotExistExcepion exception, HttpServletResponse response) {

        return new JsonResponse(false, "user not exist");
    }
}
