package com.got.common.dao;

import com.got.common.model.Character;

import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;


//@Transactional
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

	/*public Stock findByStockCode(String stockCode){
		List list = getHibernateTemplate().find(
                      "from Stock where stockCode=?",stockCode
                );
	}*/
}


