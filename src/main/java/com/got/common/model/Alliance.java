package com.got.common.model;

public class Alliance {
	
	private Integer id;
	private String houseP;
	private String houseQ;
    private java.sql.Timestamp begin;
    private java.sql.Timestamp end;
	
	public Alliance() { }
	
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
}
