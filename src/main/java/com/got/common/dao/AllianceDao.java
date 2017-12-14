package com.got.common.dao;

import com.got.common.model.Alliance;

import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false) 
@EnableTransactionManagement
public class AllianceDao extends HibernateDaoSupport {
	
	public void save(Alliance alliance){
		getHibernateTemplate().save(alliance);
	}

	public void update(Alliance alliance){
		getHibernateTemplate().update(alliance);
	}

	public void delete(Alliance alliance){
		getHibernateTemplate().delete(alliance);
	}
	
	public void flush(){
		getHibernateTemplate().flush();
	}
	
}


