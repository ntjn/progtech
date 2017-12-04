package com.got.common.dao;

import com.got.common.model.Character;
import com.got.common.model.House;
import com.got.common.model.Alliance;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false) 
@EnableTransactionManagement
public class JoinedDao extends HibernateDaoSupport {
    
    public List getCharacters() {
    	String sqlQuery = "" +
            "select c.id, c.armySize, c.house, h.crest, h.motto" +
            " from " +
                "(select * from characters) as c" +
            " join " +
                "(select * from houses) as h" +
            " on " +
                "(c.house = h.name)";

    	Session current = getHibernateTemplate().getSessionFactory().getCurrentSession();
        
        SQLQuery query = current.createSQLQuery(sqlQuery);

        return query.list();
    }
}


