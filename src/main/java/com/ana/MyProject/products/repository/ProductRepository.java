package com.ana.MyProject.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ana.MyProject.products.model.Product;

/**
 * @author anita
 *
 * @version 1.0
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
