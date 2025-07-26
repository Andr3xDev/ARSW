package edu.arsw.networking.socketsMath;

import java.net.*;
import java.io.*;

public class ServerSocketMath {

    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(30000);
            System.out.println("Waiting for request...");
        } catch (IOException e) {
            System.err.println("No posible to use this socket by port.");
            System.exit(1);
        }
        Socket clientSocket = null;
        try {
            clientSocket = serverSocket.accept();
        } catch (IOException e) {
            System.err.println("Accept failed.");
            System.exit(1);
        }

        PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(
                        clientSocket.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            try {
                int numero = Integer.parseInt(inputLine);
                int square = numero * numero;
                out.println("Square number of " + numero + " is: " + square);
            } catch (NumberFormatException e) {
                System.out.println("Not valid.");
            }
        }
        out.close();
        in.close();
        clientSocket.close();
        serverSocket.close();
    }
}
