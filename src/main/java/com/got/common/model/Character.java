package com.got.common.model;

public class Character {
	
    private Integer id;
	private String name;
	private Integer armySize;
	private boolean state;
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

    public Integer getArmySize() {
        return this.armySize;
    }

    public void setArmySize(Integer armySize) {
        this.armySize = armySize;
    }

    public boolean getState() {
        return this.state;
    }

    public void setState(boolean state) {
        this.state = state;
    }
	
	public String getHouse() {
		return this.house;
	}
	
	public void setHouse(String house) {
		this.house = house;
	}
}
