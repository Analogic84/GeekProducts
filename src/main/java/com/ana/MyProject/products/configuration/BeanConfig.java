package com.ana.MyProject.products.configuration;

import org.springframework.context.annotation.Bean;

import com.ana.MyProject.products.controller.ProductController;
import com.ana.MyProject.products.repository.ProductRepository;
import com.ana.MyProject.products.service.ProductService;

/**
 * The Class BeanConfig.
 *
 * @author anita
 * 
 * @version 1.0
 */
public class BeanConfig {

	/**
	 * Create a service bean.
	 *
	 * @param repository receive a repository that will be injected into the service
	 * @return the product service
	 * @returnBuilder that injects a repository into the service
	 */
	@Bean
	public ProductService productService(ProductRepository repository) {
		return new ProductService(repository);
	}

	/**
	 * Product controller.
	 *
	 * @param service the service
	 * @return the product controller
	 */
	@Bean
	public ProductController productController(ProductService service) {
		return new ProductController(service);
	}
}
