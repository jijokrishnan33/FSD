package com.cts.fsd.repository.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class WorkoutCollection {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int workoutId;
	private String workoutTitle;
	private String workoutNote;
	private double caloriesBurnPerMin;
	
	@ManyToOne
	@JoinColumn(name="categoryId", nullable=false)
	private WorkoutCategory category;
	
	@OneToMany(mappedBy="workout",cascade=CascadeType.ALL)
	private Set<WorkoutActive> activeWorkouts;
	
	public int getWorkoutId() {
		return workoutId;
	}
	public void setWorkoutId(int workoutId) {
		this.workoutId = workoutId;
	}
	public String getWorkoutTitle() {
		return workoutTitle;
	}
	public void setWorkoutTitle(String workoutTitle) {
		this.workoutTitle = workoutTitle;
	}
	public String getWorkoutNote() {
		return workoutNote;
	}
	public void setWorkoutNote(String workoutNote) {
		this.workoutNote = workoutNote;
	}
	public double getCaloriesBurnPerMin() {
		return caloriesBurnPerMin;
	}
	public void setCaloriesBurnPerMin(double caloriesBurnPerMin) {
		this.caloriesBurnPerMin = caloriesBurnPerMin;
	}
	
	public WorkoutCategory getCategory() {
		return category;
	}
	public void setCategory(WorkoutCategory category) {
		this.category = category;
	}

}
