package com.got.common.dao;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.got.common.model.Character;

import java.io.IOException;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false) 
@EnableTransactionManagement
public class CharacterDao extends HibernateDaoSupport {

	public void save(Character character){
		getHibernateTemplate().save(character);
	}

	public void update(Character character){
		getHibernateTemplate().update(character);
	}

	public void delete(Character character){
		getHibernateTemplate().delete(character);
	}
	
	public void flush(){
		getHibernateTemplate().flush();
	}
    
    public List getList() {
        String sqlQuery = "select * from characters";

    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();

        SQLQuery query = current.createSQLQuery(sqlQuery);

        List lstData = query.list();
        
        return lstData;
    }
    
    public List getList2() {
        //String sqlQuery = "select * from (select * from characters) as c join (select * from houses) as h on (c.house = h.name)";
    	String sqlQuery = "select c.id as id, c.armySize, c.house, h.name, h.crest, h.motto  from (select * from characters) as c join (select * from houses) as h on (c.house = h.name)";
    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();

        SQLQuery query = current.createSQLQuery(sqlQuery);

        List lstData = query.list();
        
        return lstData;
    }

    public List getCharacters() {
    	String sqlQuery = "" +
            "select c.id, c.armySize, c.house, h.name, h.crest, h.motto" +
            "from" +
                "(select * from characters) as c" +
            "join" +
                "(select * from houses) as h" +
            "on" +
                "(c.house = h.name)";

    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();
        
        SQLQuery query = current.createSQLQuery(sqlQuery);

        return query.list();
    }

    public List getCharColumns() {
    	String sqlQuery = "show columns from characters";

    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();
        
        SQLQuery query = current.createSQLQuery(sqlQuery);

        return query.list();
    }
}


