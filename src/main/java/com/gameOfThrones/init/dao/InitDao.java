package com.gameOfThrones.init.dao;

import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.gameOfThrones.init.model.Init;

@Transactional
@EnableTransactionManagement
public class InitDao extends HibernateDaoSupport {
	
	public void save(Init init){
		getHibernateTemplate().save(init);
	}

	public void update(Init init){
		getHibernateTemplate().update(init);
	}

	public void delete(Init init){
		getHibernateTemplate().delete(init);
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


/*public interface StockBo {

	void save(Stock stock);
	void update(Stock stock);
	void delete(Stock stock);
	Stock findByStockCode(String stockCode);
}

ipackage com.mkyong.stock.bo.impl;

import com.mkyong.stock.bo.StockBo;
import com.mkyong.stock.dao.StockDao;
import com.mkyong.stock.model.Stock;

public class StockBoImpl implements StockBo{

	StockDao stockDao;

	public void setStockDao(StockDao stockDao) {
		this.stockDao = stockDao;
	}

	public void save(Stock stock){
		stockDao.save(stock);
	}

	public void update(Stock stock){
		stockDao.update(stock);
	}

	public void delete(Stock stock){
		stockDao.delete(stock);
	}

	public Stock findByStockCode(String stockCode){
		return stockDao.findByStockCode(stockCode);
	}
}*/

