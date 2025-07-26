package edu.arsw.parcial.adapters;

import org.springframework.stereotype.Component;

import edu.arsw.parcial.controllers.ChatGPTController;

@Component
public class ChatGptAdapter {

    private final ChatGPTController controller;

    public ChatGptAdapter(ChatGPTController controller) {
        this.controller = controller;
    }

    public String generateResponse(String input) {
        try {
            return controller.generateRawResponse(input);
        } catch (Exception e) {
            System.err.println("Error en ChatGptAdapter al generar respuesta: " + e.getMessage());
            return "Error al generar respuesta de ChatGPT: " + e.getMessage();
        }
    }

    public String getEstado() {
        return "general";
    }
}