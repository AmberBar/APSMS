package com.apsms.service.impl;

import com.apsms.modal.Goods;
import com.apsms.repository.GoodsRepository;
import com.apsms.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    private GoodsRepository goodsRepository;

    @Override
    public Goods createGood(Goods autoParts) {
        return goodsRepository.save(autoParts);
    }
}
