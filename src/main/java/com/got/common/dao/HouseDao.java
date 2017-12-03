package com.got.common.dao;

import com.got.common.model.House;

import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false) 
@EnableTransactionManagement
public class HouseDao extends HibernateDaoSupport {
	
	public void save(House house){
		getHibernateTemplate().save(house);
	}

	public void update(House house){
		getHibernateTemplate().update(house);
	}

	public void delete(House house){
		getHibernateTemplate().delete(house);
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


