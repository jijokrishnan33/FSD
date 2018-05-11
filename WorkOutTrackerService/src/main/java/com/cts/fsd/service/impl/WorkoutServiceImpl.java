package com.cts.fsd.service.impl;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cts.fsd.repository.ActiveWorkoutRepository;
import com.cts.fsd.repository.Workoutrepository;
import com.cts.fsd.repository.entity.WorkoutActive;
import com.cts.fsd.repository.entity.WorkoutCategory;
import com.cts.fsd.repository.entity.WorkoutCollection;
import com.cts.fsd.service.WorkoutService;
import com.cts.fsd.vo.ActiveWorkout;
import com.cts.fsd.vo.Category;
import com.cts.fsd.vo.Response;
import com.cts.fsd.vo.Workout;

@Service
public class WorkoutServiceImpl implements WorkoutService{

	
	@Autowired
	Workoutrepository repository;
	
	@Autowired
	ActiveWorkoutRepository activeRepository;
	
	@Override
	public ResponseEntity<List<Workout>> getAllWorkouts() {
		List<Workout> workouts=new ArrayList<Workout>();
		List<WorkoutCollection> workoutCollections=(List<WorkoutCollection>) repository.findAll();
		if (workoutCollections != null && !workoutCollections.isEmpty()) {
			for (WorkoutCollection workoutCollection : workoutCollections) {
				Workout workout = new Workout();
				workout.setId(workoutCollection.getWorkoutId());
				workout.setTitle(workoutCollection.getWorkoutTitle());
				workout.setNotes(workoutCollection.getWorkoutNote());
				workout.setCalBurntPerMin(workoutCollection.getCaloriesBurnPerMin());
				if(workoutCollection.getCategory() != null) {
					Category category = new Category();
					category.setId(workoutCollection.getCategory().getCategoryId());
					category.setName(workoutCollection.getCategory().getCategoryName());
					workout.setCategory(category);
				}
				workouts.add(workout);
			}
			return new ResponseEntity<List<Workout>>(workouts, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<Workout>>(workouts, HttpStatus.NO_CONTENT);
		}
	}

	@Override
	public ResponseEntity<Workout> getWorkoutById(String id) {
		WorkoutCollection workoutCollection= new WorkoutCollection(); 
		Workout workout = new Workout();
		if(id==null) {
			return new ResponseEntity<Workout>(workout, HttpStatus.NO_CONTENT);
		} else {
			workoutCollection=repository.findById(Integer.parseInt(id)).get();
			
			workout.setId(workoutCollection.getWorkoutId());
			workout.setTitle(workoutCollection.getWorkoutTitle());
			workout.setNotes(workoutCollection.getWorkoutNote());
			workout.setCalBurntPerMin(workoutCollection.getCaloriesBurnPerMin());
			if(workoutCollection.getCategory() != null) {
				Category category = new Category();
				category.setId(workoutCollection.getCategory().getCategoryId());
				category.setName(workoutCollection.getCategory().getCategoryName());
				workout.setCategory(category);
			}
			return new ResponseEntity<Workout>(workout, HttpStatus.OK);
		}
		
	}

	@Override
	public ResponseEntity<Response> saveWorkout(Workout workout) {
		WorkoutCollection workoutCollection= new WorkoutCollection();
		WorkoutCategory categoryCollection= new WorkoutCategory();
		workoutCollection.setWorkoutId(workout.getId());
		workoutCollection.setWorkoutTitle(workout.getTitle());
		workoutCollection.setWorkoutNote(workout.getNotes());
		workoutCollection.setCaloriesBurnPerMin(workout.getCalBurntPerMin());
		categoryCollection.setCategoryId(workout.getCategory().getId());
		categoryCollection.setCategoryName(workout.getCategory().getName());
		workoutCollection.setCategory(categoryCollection);
		repository.save(workoutCollection);
		return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Response> deleteWorkout(Workout workout) {
		WorkoutCollection workoutCollection= new WorkoutCollection();
		workoutCollection=repository.findById(workout.getId()).get();
		repository.delete(workoutCollection);
		return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Response> saveActiveWorkout(ActiveWorkout workout) {
		WorkoutActive workoutActive= new WorkoutActive();
		workoutActive.setActiveWorkoutId(workout.getActiveWorkoutId());
		workoutActive.setComments(workout.getComment());
		workoutActive.setEndDate(new Date(workout.getEndDate().getTime()));
		workoutActive.setEndTime(Time.valueOf(workout.getEndTime()));
		workoutActive.setStartDate(new Date(workout.getStartDate().getTime()));
		workoutActive.setStartTime(Time.valueOf(workout.getStartTime()));
		workoutActive.setStatus(false);
		if (workout.getWorkOut() != null) {
			Workout workouts=workout.getWorkOut();
			WorkoutCollection workoutCollection = new WorkoutCollection();
			WorkoutCategory categoryCollection = new WorkoutCategory();
			workoutCollection.setWorkoutId(workouts.getId());
			workoutCollection.setWorkoutTitle(workouts.getTitle());
			workoutCollection.setWorkoutNote(workouts.getNotes());
			categoryCollection.setCategoryId(workouts.getCategory().getId());
			categoryCollection.setCategoryName(workouts.getCategory().getName());
			workoutCollection.setCategory(categoryCollection);
			workoutActive.setWorkout(workoutCollection);
		}
		activeRepository.save(workoutActive);
		return new ResponseEntity<Response>(new Response("Success"), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<ActiveWorkout>> getAllActiveWorkout() {
		List<ActiveWorkout> activeWorkouts=new ArrayList<ActiveWorkout>();
		List<WorkoutActive> activeWorkoutCollections=activeRepository.findAll();
		
		for (WorkoutActive workoutActive : activeWorkoutCollections) {
			ActiveWorkout activeWorkout = new ActiveWorkout();
			activeWorkout.setActiveWorkoutId(workoutActive.getActiveWorkoutId());
			activeWorkout.setComment(workoutActive.getComments());
			activeWorkout.setEndDate(workoutActive.getEndDate());
			activeWorkout.setEndTime(workoutActive.getEndTime().toString());
			activeWorkout.setStartDate(workoutActive.getStartDate());
			activeWorkout.setStartTime(workoutActive.getStartTime().toString());
			
			WorkoutCollection workoutCollection=workoutActive.getWorkout();
			Workout workout = new Workout();
			workout.setId(workoutCollection.getWorkoutId());
			workout.setTitle(workoutCollection.getWorkoutTitle());
			workout.setNotes(workoutCollection.getWorkoutNote());
			workout.setCalBurntPerMin(workoutCollection.getCaloriesBurnPerMin());
			if(workoutCollection.getCategory() != null) {
				Category category = new Category();
				category.setId(workoutCollection.getCategory().getCategoryId());
				category.setName(workoutCollection.getCategory().getCategoryName());
				workout.setCategory(category);
			}
			activeWorkout.setWorkOut(workout);
			activeWorkouts.add(activeWorkout);
		}
		return new ResponseEntity<List<ActiveWorkout>>(activeWorkouts, HttpStatus.OK);
	}
	
	

}
