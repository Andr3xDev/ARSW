package edu.arsw.wheater.controllers;

import edu.arsw.wheater.models.City;
import edu.arsw.wheater.services.WeatherFacade;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class WeatherController {
    @Value("${api_key}")
    private String apikey;
    private final WeatherFacade weatherFacade;

    public WeatherController(WeatherFacade weatherFacade) {
        this.weatherFacade = weatherFacade;
    }

    @GetMapping("/get")
    public String generate(@RequestBody City city){
        return weatherFacade.getCityData(city.getName(), city.getData());
    }

}
