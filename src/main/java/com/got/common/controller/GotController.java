package com.got.common.controller;

import com.got.common.dao.AllianceDao;
import com.got.common.dao.CharacterDao;
import com.got.common.dao.HouseDao;
import com.got.common.model.Alliance;
import com.got.common.model.Character;
import com.got.common.model.House;

import com.got.common.model.Form;

import com.got.common.dao.JoinedDao;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;

@Controller
//@RestController
public class GotController {

    private ApplicationContext appContext = new ClassPathXmlApplicationContext("spring/config/BeanResources.xml");

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/saveCharacter", method = RequestMethod.POST,  produces = "application/json")
    public String cTest(@RequestBody Character character) {
      	CharacterDao characterDao = (CharacterDao)appContext.getBean("characterDao");
      	
        characterDao.save(character);

        return "index";
    }

    @RequestMapping(value = "/saveHouse", method = RequestMethod.POST,  produces = "application/json")
    public String cTest(@RequestBody House house) {
      	HouseDao houseDao = (HouseDao)appContext.getBean("houseDao");
      	
        houseDao.save(house);

        return "index";
    }

    @RequestMapping(value = "/saveAlliance", method = RequestMethod.POST,  produces = "application/json")
    public String cTest(@RequestBody Alliance alliance) {
      	AllianceDao allianceDao = (AllianceDao)appContext.getBean("allianceDao");
      	
        allianceDao.save(alliance);

        return "index";
    }

    @RequestMapping(value = "/getTHead", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List getTHead() {
        JoinedDao joinedDao = (JoinedDao)appContext.getBean("joinedDao");
      	
    	return joinedDao.getTHead();
    }
    
    @RequestMapping(value = "/getTBody", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List getTBody() {
        JoinedDao joinedDao = (JoinedDao)appContext.getBean("joinedDao");
      	
    	return joinedDao.getTBody();
    }

    @RequestMapping(value = "/getCharColumns", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List getCharColumns() {
        CharacterDao characterDao = (CharacterDao)appContext.getBean("characterDao");
      	
    	return characterDao.getCharColumns();
    }

    // TODO sophisticated solution
    @RequestMapping(value = "/getHeaders", method = RequestMethod.POST,  produces = "application/json")
    @ResponseBody
    public List getHeaders(@RequestBody Form form) {
      	JoinedDao joinedDao = (JoinedDao)appContext.getBean("joinedDao");
        System.out.println(form.getName());
      	
        return joinedDao.getHeaders(form.getName());
    }
}
