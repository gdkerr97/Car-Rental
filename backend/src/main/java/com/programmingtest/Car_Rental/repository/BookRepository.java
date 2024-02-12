package com.programmingtest.Car_Rental.repository;

import com.programmingtest.Car_Rental.entity.Book;
import com.programmingtest.Car_Rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<List<Book>> findAllByUser(User user);
}