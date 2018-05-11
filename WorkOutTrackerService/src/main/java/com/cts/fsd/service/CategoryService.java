package com.cts.fsd.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.cts.fsd.vo.Category;
import com.cts.fsd.vo.Response;
import com.cts.fsd.vo.Workout;

public interface CategoryService {

	public ResponseEntity<List<Category>> getAllCategories();

	public ResponseEntity<Category> getCategoryById(String id);

	public ResponseEntity<Response> saveCategory(Category category);

	public ResponseEntity<Response> deleteteCategory(Category category);

}
