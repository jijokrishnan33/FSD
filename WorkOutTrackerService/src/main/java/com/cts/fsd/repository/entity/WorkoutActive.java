package com.cts.fsd.repository.entity;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class WorkoutActive {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int activeWorkoutId;
	@ManyToOne
	@JoinColumn(name="workoutId", nullable=false)
	private WorkoutCollection workout;
	private Time startTime;
	private Date startDate;
	private Time endTime;
	private Date endDate;
	private String comments;
	private boolean status;
	public int getActiveWorkoutId() {
		return activeWorkoutId;
	}
	public void setActiveWorkoutId(int activeWorkoutId) {
		this.activeWorkoutId = activeWorkoutId;
	}
	
	public Time getStartTime() {
		return startTime;
	}
	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Time getEndTime() {
		return endTime;
	}
	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public WorkoutCollection getWorkout() {
		return workout;
	}
	public void setWorkout(WorkoutCollection workout) {
		this.workout = workout;
	}
	
	
}
