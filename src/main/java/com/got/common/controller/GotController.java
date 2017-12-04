package com.got.common.controller;

import com.got.common.dao.CharacterDao;
import com.got.common.dao.HouseDao;
import com.got.common.model.Character;
import com.got.common.model.House;

import com.got.common.dao.JoinedDao;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;
import java.util.List;
import java.util.Map;

//import java.util.Collections;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@Controller
public class GotController {

    @RequestMapping("/addOneRow")
    public void addOneRow() {
        ApplicationContext appContext = new ClassPathXmlApplicationContext("spring/config/BeanResources.xml");

      	CharacterDao characterDao = (CharacterDao)appContext.getBean("characterDao");
      	Character character = new Character();
      	
      	character.setName("Ned");
        character.setArmySize(5);
        character.setState(false); //TODO to some number
      	character.setHouse("Stark");
      	characterDao.save(character);
      	
      	HouseDao houseDao = (HouseDao)appContext.getBean("houseDao");
      	House house = new House();
      	
      	house.setName("Stark");
      	house.setMotto("Winter is coming!");
      	house.setCrest("Direwolf");
      	houseDao.save(house);
    }

    /*@RequestMapping(value = "/getString", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Map<String, String> getString() {
        return Collections.singletonMap("response", "your string value");
    }
    
    @RequestMapping(value = "/getList", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List getList() {
    	ApplicationContext appContext = new ClassPathXmlApplicationContext("spring/config/BeanResources.xml");
      	CharacterDao characterDao = (CharacterDao)appContext.getBean("characterDao");
    	
        //return Collections.singletonMap("response", "your string value");
    	return characterDao.getList();
    }*/
    
    @RequestMapping(value = "/getCharacters", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List getCharacters() {
    	ApplicationContext appContext = new ClassPathXmlApplicationContext("spring/config/BeanResources.xml");
        JoinedDao joinedDao = (JoinedDao)appContext.getBean("joinedDao");
      	
    	return joinedDao.getCharacters();
    }
    
}









