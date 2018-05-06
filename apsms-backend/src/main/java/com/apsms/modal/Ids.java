package com.apsms.modal;

import java.io.Serializable;
import java.util.List;

public class Ids implements Serializable {
    private static final long serialVersionUID = 3063377436992281626L;
    private List<Integer> ids;

    @Override
    public String toString() {
        return "Ids{" +
                "ids=" + ids +
                '}';
    }
}
