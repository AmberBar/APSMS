package com.apsms.service;

import com.apsms.modal.mall.Goods;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface GoodService {

    public Goods createGood(Goods autoParts);

    Page<Goods> queryAll(final Goods goods, int pageNumber, int pageSize);

    void delete(Goods goods);

    Goods getGoodsById(Integer id);
}
