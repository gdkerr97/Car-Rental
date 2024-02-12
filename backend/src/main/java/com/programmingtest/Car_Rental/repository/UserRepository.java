package com.programmingtest.Car_Rental.repository;

import com.programmingtest.Car_Rental.entity.User;
import com.programmingtest.Car_Rental.enums.Role;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByRole(@NotNull Role role);
}
