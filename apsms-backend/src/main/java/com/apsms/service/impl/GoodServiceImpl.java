package com.apsms.service.impl;

import com.apsms.modal.mall.Goods;
import com.apsms.repository.GoodsRepository;
import com.apsms.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;

@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    private GoodsRepository goodsRepository;

    @Override
    public Goods createGood(Goods autoParts) {
        return goodsRepository.save(autoParts);
    }

    @Override
    public Page<Goods> queryAll(final Goods goods, int pageNumber, int pageSize) {
        Pageable pageable=new PageRequest(pageNumber, pageSize);

        Specification<Goods> spec = new Specification<Goods>() {

            @Override
            public Predicate toPredicate(Root<Goods> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                Path<String> name = root.get("name");

                Predicate p1 = cb.like(name, "%" + goods.getName() +"%");

                Predicate p = cb.and(p1);

                return p;
            }
        };

        return goodsRepository.findAll( spec,pageable);
    }

    @Override
    public void delete(Goods goods) {
        goodsRepository.delete(goods);
    }

    @Override
    public Goods getGoodsById(Integer id) {
        return goodsRepository.findOne(id);
    }
}
