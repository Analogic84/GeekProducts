package com.ana.MyProject.products.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author anita
 *
 * @version 1.0
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PRODUCT_TABLE")
public class Product {

	@Id
	@GeneratedValue
	private int id;
	private String name;
	private int stock;
	private double price;

}
