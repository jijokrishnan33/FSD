package com.cts.fsd.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.cts.fsd.vo.ActiveWorkout;
import com.cts.fsd.vo.Response;
import com.cts.fsd.vo.Workout;


public interface WorkoutService {
	
	public ResponseEntity<List<Workout>> getAllWorkouts();

	public ResponseEntity<Workout> getWorkoutById(String id);

	public ResponseEntity<Response> saveWorkout(Workout workout);

	public ResponseEntity<Response> deleteWorkout(Workout workout);

	public ResponseEntity<Response> saveActiveWorkout(ActiveWorkout activeWorkout);

	public ResponseEntity<List<ActiveWorkout>> getAllActiveWorkout();

}
