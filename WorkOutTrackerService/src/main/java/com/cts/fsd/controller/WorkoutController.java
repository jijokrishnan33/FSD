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

import com.cts.fsd.service.WorkoutService;
import com.cts.fsd.vo.ActiveWorkout;
import com.cts.fsd.vo.Response;
import com.cts.fsd.vo.Workout;

@RestController
@CrossOrigin(origins="*")
public class WorkoutController {
	
	@Autowired
	WorkoutService workoutService;

	@RequestMapping(value="/workout/getall",method = RequestMethod.GET)
	public ResponseEntity<List<Workout>> getAllWorkouts(){
		
		return workoutService.getAllWorkouts();
		
	}
	
	@RequestMapping(value="/workout/getworkout/{id}",method = RequestMethod.GET)
	public ResponseEntity<Workout> getWorkoutById(@PathVariable String id){
		
		return workoutService.getWorkoutById(id);
		
	}
	
	@RequestMapping(value="/workout/save",method = RequestMethod.POST)
	public ResponseEntity<Response> saveWorkout(@RequestBody Workout workout){
		
		return workoutService.saveWorkout(workout);
		
	}
	
	@RequestMapping(value="/workout/delete",method = RequestMethod.POST)
	public ResponseEntity<Response> deleteteWorkout(@RequestBody Workout workout){
		
		return workoutService.deleteWorkout(workout);
		
	}
	
	@RequestMapping(value="/activeworkout/save",method = RequestMethod.POST)
	public ResponseEntity<Response> saveActiveWorkout(@RequestBody ActiveWorkout activeWorkout){
		
		return workoutService.saveActiveWorkout(activeWorkout);
		
	}
	
	@RequestMapping(value="/activeworkout/getall",method = RequestMethod.GET)
	public ResponseEntity<List<ActiveWorkout>> getAllActiveWorkout(){
		
		return workoutService.getAllActiveWorkout();
		
	}

}
