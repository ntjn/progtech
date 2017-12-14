package com.got.common.model;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;

public class Character {
	
    private Integer id;
	private String name;
	private Integer armySize;
	private boolean state;
	private String house;
	
	public Character() { }

	public Character(String name, Integer armySize, boolean state, String house) {
        this.name = name;
        this.armySize = armySize;
        this.state = state;
        this.house = house;
    }

	public Character(Integer id, String name, Integer armySize, boolean state, String house) {
        this(name, armySize, state, house);
        this.id = id;
    }
	
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

    @JsonCreator
    public static Character Create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jsonString, Character.class);
    }
}
