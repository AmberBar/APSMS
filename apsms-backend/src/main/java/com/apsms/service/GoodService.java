package com.apsms.service;

import com.apsms.modal.Goods;
import com.apsms.modal.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface GoodService {

    public Goods createGood(Goods autoParts);

    Page<Goods> queryAll(final Goods goods, int pageNumber, int pageSize);
}
