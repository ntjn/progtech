package com.gameOfThrones.common;

import com.gameOfThrones.init.dao.InitDao;
import com.gameOfThrones.init.model.Init;

import org.hibernate.FlushMode;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App
{
    public static void main( String[] args )
    {        
        ApplicationContext appContext = new ClassPathXmlApplicationContext("spring/config/beanLocations.xml");

      	InitDao initDao = (InitDao)appContext.getBean("initDao");
      	initDao.getSessionFactory().getCurrentSession().setFlushMode(FlushMode.COMMIT);

      	/** insert **/
      	Init init = new Init();
      	
      	init.setId(13);
      	init.setHouse("Lannister");
      	init.setName("Tyrion");
      	initDao.save(init);
      	initDao.flush();
      	
      	/** select **/
      	/*Stock stock2 = stockBo.findByStockCode("7668");
      	System.out.println(stock2);*/

      	/** update **/
      	/*stock2.setStockName("HAIO-1");
      	stockBo.update(stock2);*/

      	/** delete **/
      	//stockBo.delete(stock2);

      	System.out.println("Done");
    }
}