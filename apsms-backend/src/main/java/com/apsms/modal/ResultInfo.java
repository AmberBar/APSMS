package com.apsms.modal;

import java.io.Serializable;

public class ResultInfo implements Serializable {

    private static final long serialVersionUID = 7860950988442839784L;
    private int code;

    private String msg;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
