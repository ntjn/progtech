package com.got.common.model;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;

public class FieldOfTable {
	
	private Form form;
	private Field field;

    public FieldOfTable() { }

    public FieldOfTable(Form form, Field field) {
        this.form = form;
        this.field = field;
    }

	public Form getForm() {
		return this.form;
	}
	
	public void setForm(Form form) {
		this.form = form;
	}

    public Field getField() {
		return this.field;
	}
	
	public void setField(Field field) {
		this.field = field;
	}

    @JsonCreator
    public static FieldOfTable Create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jsonString, FieldOfTable.class);
    }
}
