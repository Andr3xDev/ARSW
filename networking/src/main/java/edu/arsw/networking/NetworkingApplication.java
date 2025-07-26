package edu.arsw.networking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.InputMismatchException;
import java.util.Scanner;
import edu.arsw.networking.*;
import java.io.IOException;

@SpringBootApplication
public class NetworkingApplication {

    public static void main(String[] args) {
        SpringApplication.run(NetworkingApplication.class, args); 

        Scanner scanner = new Scanner(System.in);

        System.out.println("\n--- Seleccione un Ejercicio ---");
        System.out.println("1 : URL values)");
        System.out.println("2 : URL find into a file");
        System.out.println("3 : Socket to return an operation");
        System.out.println("4 : Abrir URL en navegador del sistema");
        System.out.print("Seleccione una opción: ");

        try {
            int option = scanner.nextInt();
            scanner.nextLine();

            switch (option) {
                case 1:
                    URLReader urlReader = new URLReader();
                    urlReader.printAll(); 
                    break;
                case 2:
                    System.out.print("URL: ");
                    String urlToSave = scanner.nextLine();
                    try {
                        Browser.createHtml(urlToSave);
                    } catch (Exception e) {
                        System.err.println("Error saving URL: " + e.getMessage());
                    }
                    break;
                case 3:
                    
                    Thread serverThread = new Thread(() -> {
                        try {
                            edu.arsw.networking.socketsMath.ServerSocketMath.main(new String[]{});
                        } catch (java.io.IOException e) {
                            System.err.println("Error in Thread sockets: " + e.getMessage());
                        }
                    });
                    serverThread.setDaemon(true);
                    serverThread.start();
                    
                    try {
                        Thread.sleep(1000); 
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }

                    edu.arsw.networking.socketsMath.ClientSocketMath.main(new String[]{});
                    break;
                default:
                    System.out.println("Not valid.");
                    break;
            }
        } catch (InputMismatchException e) {
                System.out.println("Not valid.");
        } finally {
            scanner.close();
            System.out.println("Programa finalizado.");
        }
    }
}
