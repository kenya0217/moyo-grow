package com.example.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.User;

public interface UsersRepository extends JpaRepository<User, Integer> {
    public List<User> findById(int id);
}