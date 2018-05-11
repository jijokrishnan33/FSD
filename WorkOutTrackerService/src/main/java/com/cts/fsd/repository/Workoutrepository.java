package com.cts.fsd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.fsd.repository.entity.WorkoutCollection;

@Repository
public interface Workoutrepository extends JpaRepository<WorkoutCollection, Integer> {

}
