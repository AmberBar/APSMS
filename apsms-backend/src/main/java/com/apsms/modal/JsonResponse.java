package com.apsms.modal;

import java.io.Serializable;

public class JsonResponse implements Serializable {


    private static final long serialVersionUID = -899442115821961167L;
    private boolean success;
    private Object data;

    public JsonResponse(boolean success, Object data) {
        this.success = success;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
