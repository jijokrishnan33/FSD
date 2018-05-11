package com.cts.fsd.vo;

import java.io.Serializable;
import java.util.Date;

public class ActiveWorkout implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int activeWorkoutId;
	private Workout workOut;
	private String comment;
	private Date startDate;
	private String startTime;
	private Date endDate;
	private String endTime;
	public int getActiveWorkoutId() {
		return activeWorkoutId;
	}
	public void setActiveWorkoutId(int activeWorkoutId) {
		this.activeWorkoutId = activeWorkoutId;
	}
	
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Workout getWorkOut() {
		return workOut;
	}
	public void setWorkOut(Workout workOut) {
		this.workOut = workOut;
	}
	

}
