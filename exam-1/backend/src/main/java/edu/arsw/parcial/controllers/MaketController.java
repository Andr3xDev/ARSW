package edu.arsw.parcial.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.arsw.parcial.services.MarketService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/market")
public class MaketController {

    private MarketService marketService;
    private String apiKey;
    private String apiUrl;

    public MaketController(@Value("${market.api}") String apiKey, @Value("${market.url}") String apiUrl, MarketService marketService) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.marketService = marketService;
    }

    @GetMapping()
    public ResponseEntity<String> getInfo(@RequestParam(value = "type") String input) {

        System.out.println("Llamando info");

        
        return null;
    }    

}
