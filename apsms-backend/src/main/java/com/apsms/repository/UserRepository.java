package com.apsms.repository;

import com.apsms.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    @Query(value = "select * from user b where b.name like %?1%", nativeQuery = true)
    List<User> findByName(String name);
}
