package com.apsms.service;

import com.apsms.modal.Goods;
import org.springframework.stereotype.Service;

@Service
public interface GoodService {

    public Goods createGood(Goods autoParts);
}
