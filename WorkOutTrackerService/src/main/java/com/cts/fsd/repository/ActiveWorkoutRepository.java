package com.cts.fsd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.fsd.repository.entity.WorkoutActive;

@Repository
public interface ActiveWorkoutRepository extends JpaRepository<WorkoutActive, Integer>{

}
