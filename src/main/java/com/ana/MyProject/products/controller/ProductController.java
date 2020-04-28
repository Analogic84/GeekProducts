package com.ana.MyProject.products.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ana.MyProject.products.model.Product;
import com.ana.MyProject.products.service.ProductService;


/**
 * The Class ProductController.
 *
 * @author anita
 * 
 * @version 1.0
 */
@RestController
@CrossOrigin
public class ProductController {

	/** The service. */
	private ProductService service;

	/**
	 * Instantiates a new product controller.
	 *
	 * @param service the service
	 */
	public ProductController(ProductService service) {
		this.service = service;
	}
	
	/**
	 * Find all products.
	 *
	 * @return the list
	 */
	@GetMapping("/products/web")
	public List<Product> findAllProducts(){
		return service.getProducts();
	}

	/**
	 * Find product by id.
	 *
	 * @param id the id
	 * @return the product
	 */
	@GetMapping("/products/{id}")
	public Product findProductById(@PathVariable int id) {
		return service.getProductById(id);
	}
	
	/**
	 * Delete product.
	 *
	 * @param id the id
	 * @return the string
	 */
	@DeleteMapping("/delete/{id}")
	public String deleteProduct(@PathVariable int id) {
		
		return service.deleteProduct(id);
	}
}
