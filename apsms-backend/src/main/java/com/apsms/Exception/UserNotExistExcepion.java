package com.apsms.Exception;

public class UserNotExistExcepion extends RuntimeException{

    private String msg;

    public UserNotExistExcepion(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public UserNotExistExcepion() {
       super();
    }

}
