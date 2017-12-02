package com.got.common.model;

public class Character {
	
	private Integer id;
	private String name;
	private String house;
	
	public Character() { }
	
	public Integer getId() {
		return this.id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getHouse() {
		return this.house;
	}
	
	public void setHouse(String house) {
		this.house = house;
	}
}
