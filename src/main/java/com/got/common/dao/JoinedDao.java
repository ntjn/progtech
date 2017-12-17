package com.got.common.dao;

import com.got.common.model.Character;
import com.got.common.model.House;
import com.got.common.model.Alliance;

import com.got.common.model.Form;
import com.got.common.model.Field;
import com.got.common.model.FieldOfTable;

import java.util.List;
import java.util.Arrays;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false) 
@EnableTransactionManagement
public class JoinedDao extends HibernateDaoSupport {

    public List getTHead() {
        //List<String> supplierNames =
        return Arrays.asList(
            "Id", "Name", "Army size", "State", "House", "crest", "motto"
        );
    }
    
    public List getTBody() {
    	String sqlQuery = "" +
            "select c.id, c.name, c.armySize, c.state, c.house, h.crest, h.motto" +
            " from " +
                "(select * from characters) as c" +
            " join " +
                "(select * from houses) as h" +
            " on " +
                "(c.house = h.name)" +
            " order by id";

    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();
        
        SQLQuery query = current.createSQLQuery(sqlQuery);

        return query.list();
    }

    public List getHeaders(String table) {
    	String sqlQuery = "show columns from " + table;

    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();
        
        SQLQuery query = current.createSQLQuery(sqlQuery);

        return query.list();
    }

    public List getRecord(FieldOfTable field) {
    	String sqlQuery = "select * from " + field.getForm().getName() +
            " where " +
            field.getField().getName() + " = " +
            field.getField().getValue();

    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();
        
        SQLQuery query = current.createSQLQuery(sqlQuery);

        return query.list();
    }

}


