package edu.arsw.networking;

import java.io.*;
import java.net.*;

public class URLReader {

    static final URL google;

    static {
        try {
            google = new URL("https://archlinux.org/packages/");
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Contenido del Recurso ---");
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(google.openStream()))) {
            String inputLine;
            while ((inputLine = reader.readLine()) != null) {
                System.out.println(inputLine);
            }
        } catch (IOException x) {
            System.err.println(x);
        }

        URLReader myReader = new URLReader();
        
        System.out.println("\n--- Propiedades de la URL ---");
        myReader.printAll();
    }

    public void printAll() {
        System.out.println("Protocol: " + google.getProtocol());
        System.out.println("Authority: " + google.getAuthority());
        System.out.println("Host: " + google.getHost());
        System.out.println("Port: " + (google.getPort() == -1 ? "80 (default)" : google.getPort()));
        System.out.println("Path: " + google.getPath());
        System.out.println("Query: " + google.getQuery());
        System.out.println("File: " + google.getFile());
        System.out.println("Ref: " + google.getRef());
    }
}
