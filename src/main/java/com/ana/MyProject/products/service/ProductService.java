package com.ana.MyProject.products.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ana.MyProject.products.model.Product;
import com.ana.MyProject.products.repository.ProductRepository;

// TODO: Auto-generated Javadoc
/**
 * The Class ProductService.
 *
 * @author anita
 */
@Service
public class ProductService {

	/** The repository. */
	private  ProductRepository repository ;
	
	 /**
 	 * Instantiates a new product service.
 	 *
 	 * @param repository the repository
 	 */
 	public ProductService(ProductRepository repository ){
	        this.repository = repository;
	    }
	 
	 /**
 	 * Gets the products.
 	 *
 	 * @return the products
 	 */
 	public List<Product> getProducts(){
		 return repository.findAll();
	 }
	 
	 /**
 	 * Gets the product by id.
 	 *
 	 * @param id the id
 	 * @return the product by id
 	 */
 	public Product getProductById(int id){
		 return repository.findById(id).orElse(null);
	 }
	 
	 /**
 	 * Delete product.
 	 *
 	 * @param id the id
 	 * @return the string
 	 */
 	public String deleteProduct(int id) {
		 repository.deleteById(id);
		 return "Product removed! +id";
	 }
}
