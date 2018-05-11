package com.cts.fsd.vo;

import java.io.Serializable;

public class Workout implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String title;
	private String notes;
	private double calBurntPerMin;
	private Category category;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public double getCalBurntPerMin() {
		return calBurntPerMin;
	}
	public void setCalBurntPerMin(double calBurntPerMin) {
		this.calBurntPerMin = calBurntPerMin;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
}
