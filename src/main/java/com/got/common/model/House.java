package com.got.common.model;

public class House {
	
	private Integer id;
	private String name;
	private String crest;
	private String motto;
	
	public House() { }
	
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

}
