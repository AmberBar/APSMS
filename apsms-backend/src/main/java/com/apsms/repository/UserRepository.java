package com.apsms.repository;

import com.apsms.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer>, JpaSpecificationExecutor<User> {

    @Query(value = "select * from user b where b.username like %?1%", nativeQuery = true)
    List<User> fuzzyQueryByName(String name);

    @Query(value = "select * from user where username=?1", nativeQuery = true)
    User checkLogin(String name);

    @Query(value = "select * from user where id=?1", nativeQuery = true)
    User findOne(Integer id);
}
