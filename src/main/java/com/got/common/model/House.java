package com.got.common.model;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;

public class House {
	
	private Integer id;
	private String name;
	private String crest;
	private String motto;
	
	public House() { }

    public House(String name, String crest, String motto) {
        this.name = name;
        this.crest = crest;
        this.motto = motto;
    }

    public House(Integer id, String name, String crest, String motto) {
        this(name, crest, motto);
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

	public String getCrest() {
		return this.crest;
	}
	
	public void setCrest(String crest) {
		this.crest = crest;
	}

	public String getMotto() {
		return this.motto;
	}
	
	public void setMotto(String motto) {
		this.motto = motto;
	}

    @JsonCreator
    public static House Create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jsonString, House.class);
    }
}
