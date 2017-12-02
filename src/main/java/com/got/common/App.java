package com.got.common;

import com.got.common.dao.CharacterDao;
import com.got.common.model.Character;

import org.hibernate.FlushMode;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App
{
    public static void main( String[] args )
    {        
        ApplicationContext appContext = new ClassPathXmlApplicationContext("spring/config/beanLocations.xml");

      	CharacterDao characterDao = (CharacterDao)appContext.getBean("characterDao");
      	characterDao.getSessionFactory().getCurrentSession().setFlushMode(FlushMode.COMMIT);

      	/** insert **/
      	Character character = new Character();
      	
      	character.setId(13);
      	character.setHouse("Lannister");
      	character.setName("Tyrion");
      	characterDao.save(character);
      	characterDao.flush();
      	
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

/*
package com.gameOfThrones.common;

import org.hibernate.Session;
import com.gameOfThrones.persistence.HibernateUtil;

public class App
{
    public static void main( String[] args )
    {
        System.out.println("Maven + Hibernate + MySQL");
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();
        init in = new init();

        in.setName("4715");
        in.setHouse("GENM");

        session.save(in);
        session.getTransaction().commit();
    }
}
*/
