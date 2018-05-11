package com.cts.fsd.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cts.fsd.repository.CategoryRepository;
import com.cts.fsd.repository.entity.WorkoutCategory;
import com.cts.fsd.service.CategoryService;
import com.cts.fsd.vo.Category;
import com.cts.fsd.vo.Response;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryRepository repository;

	@Override
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = new ArrayList<Category>();
		List<WorkoutCategory> categoryCollections = (List<WorkoutCategory>) repository.findAll();

		if (categoryCollections != null && !categoryCollections.isEmpty()) {
			for (WorkoutCategory categoryCollection : categoryCollections) {
				Category category = new Category();
				category.setId(categoryCollection.getCategoryId());
				category.setName(categoryCollection.getCategoryName());
				categories.add(category);
			}
			return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<Category>>(categories, HttpStatus.NO_CONTENT);
		}
	}

	@Override
	public ResponseEntity<Category> getCategoryById(String id) {
		WorkoutCategory categoryCollection = new WorkoutCategory();
		Category category = new Category();
		if (id == null) {
			return new ResponseEntity<Category>(category, HttpStatus.NO_CONTENT);
		} else {
			categoryCollection = repository.findById(Integer.parseInt(id)).get();
			category.setId(categoryCollection.getCategoryId());
			category.setName(categoryCollection.getCategoryName());
		}
		return new ResponseEntity<Category>(category, HttpStatus.OK);
	}


	@Override
	public ResponseEntity<Response> saveCategory(Category category) {
		WorkoutCategory categoryCollection = new WorkoutCategory();
		if(category !=null) {
			categoryCollection.setCategoryId(category.getId());
			categoryCollection.setCategoryName(category.getName());
			repository.save(categoryCollection);
		}
		return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Response> deleteteCategory(Category category) {
		WorkoutCategory categoryCollection = new WorkoutCategory();
		if(category !=null) {
			categoryCollection = repository.findById(category.getId()).get();
			repository.delete(categoryCollection);
		}
		return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
	}

}
