
package com.ana.MyProject.products.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author anita
 *
 * @version 1.0
 */

/**
 * 
 * Basic configuration for Swagger
 *
 */

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	/**
	 * 
	 * @return
	 * 
	 *         Register the controllers to swagger Also it is configuring the
	 *         Swagger Docket
	 * 
	 */
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.ana.mi_proyecto.products.controller"))
				.paths(PathSelectors.any()).build();
	}

}