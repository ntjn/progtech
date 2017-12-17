package com.got.common.model;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;

public class Field {
	
	private String name;
	private String value;

    public Field() { }

    public Field(String name, String value) {
        this.name = name;
        this.value = value;
    }

	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

    public String getValue() {
		return this.value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}

    @JsonCreator
    public static Field Create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jsonString, Field.class);
    }
}
