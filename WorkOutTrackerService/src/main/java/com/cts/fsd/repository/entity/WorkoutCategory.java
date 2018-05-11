package com.cts.fsd.repository.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class WorkoutCategory {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int categoryId;
	private String categoryName;
	
	@OneToMany(mappedBy="category",cascade=CascadeType.ALL)
	private Set<WorkoutCollection> workoutCollections;
	
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Set<WorkoutCollection> getWorkoutCollections() {
		return workoutCollections;
	}
	public void setWorkoutCollections(Set<WorkoutCollection> workoutCollections) {
		this.workoutCollections = workoutCollections;
	}

}
