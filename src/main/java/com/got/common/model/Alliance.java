package com.got.common.model;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;

public class Alliance {
	
	private Integer id;
	private String houseP;
	private String houseQ;
    private java.sql.Timestamp begin;
    private java.sql.Timestamp end;
	
	public Alliance() { }

    public Alliance(String houseP, String houseQ, java.sql.Timestamp begin) {
        this.houseP = houseP;
        this.houseQ = houseQ;
        this.begin = begin;
    }

    public Alliance(Integer id, String houseP, String houseQ, java.sql.Timestamp begin) {
        this(houseP, houseQ, begin);
        this.id = id;
    }

    public Alliance(String houseP, String houseQ, java.sql.Timestamp begin, java.sql.Timestamp end) {
        this.houseP = houseP;
        this.houseQ = houseQ;
        this.begin = begin;
        this.end = end;
    }

    public Alliance(Integer id, String houseP, String houseQ, java.sql.Timestamp begin, java.sql.Timestamp end) {
        this(houseP, houseQ, begin, end);
        this.id = id;
    }
	
	public Integer getId() {
		return this.id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public String getHouseP() {
		return this.houseP;
	}
	
	public void setHouseP(String houseP) {
		this.houseP = houseP;
	}

	public String getHouseQ() {
		return this.houseQ;
	}
	
	public void setHouseQ(String houseQ) {
		this.houseQ = houseQ;
	}

    public java.sql.Timestamp getBegin() {
        return this.begin;
    }

    public void setBegin(java.sql.Timestamp begin) {
        this.begin = begin;
    }

    public java.sql.Timestamp getEnd() {
        return this.end;
    }

    public void setEnd(java.sql.Timestamp end) {
        this.end = end;
    }

    @JsonCreator
    public static Alliance Create(String jsonString) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jsonString, Alliance.class);
    }
}
