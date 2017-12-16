package com.got.common.model;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;

public class Form {
	
	private String name;

    public Form() { }

    public Form(String name) {
        this.name = name;
    }

	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

    @JsonCreator
    public static Form Create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jsonString, Form.class);
    }
}
