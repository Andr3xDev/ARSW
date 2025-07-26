package edu.arsw.wheater.services;

import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Fachada
 * Orquesta el llamado al servicio de city real si no encuentra en su cache la respuesta
 * Ademas de orquestar el llamado al servicio externo de api para los datos climaticos
 */
@Service
public class WeatherFacade {
    private final Map<String, String> cache = new ConcurrentHashMap<>();
    private final WeatherService weatherService;

    public WeatherFacade(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    public String getCityData(String name, String data){
        if(cache.containsKey(name + data)){
            System.out.println("cache");
            return cache.get(name+data);
        }

        String response = verificateValoration(empresa, String.valueOf(valoracion));

        cache.put(empresa+valoracion, response);
        return response;
    }


}