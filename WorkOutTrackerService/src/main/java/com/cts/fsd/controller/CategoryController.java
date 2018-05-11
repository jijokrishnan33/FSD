package com.cts.fsd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cts.fsd.service.CategoryService;
import com.cts.fsd.vo.Category;
import com.cts.fsd.vo.Response;

@RestController
@CrossOrigin(origins="*")
public class CategoryController {

	@Autowired
	CategoryService categoryService;

	@RequestMapping(value="/category/getall",method = RequestMethod.GET)
	public ResponseEntity<List<Category>> getAllCategoriess(){
		
		return categoryService.getAllCategories();
		
	}
	
	@RequestMapping(value="/category/getcategory/{id}",method = RequestMethod.GET)
	public ResponseEntity<Category> getCategoryById(@PathVariable String id){
		
		return categoryService.getCategoryById(id);
		
	}
	
	@RequestMapping(value="/category/save",method = RequestMethod.POST)
	public ResponseEntity<Response> saveCategory(@RequestBody Category category){
		
		return categoryService.saveCategory(category);
		
	}
	
	@RequestMapping(value="/category/delete",method = RequestMethod.POST)
	public ResponseEntity<Response> deleteteCategory(@RequestBody Category category){
		
		return categoryService.deleteteCategory(category);
		
	}
}
