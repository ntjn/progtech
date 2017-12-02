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