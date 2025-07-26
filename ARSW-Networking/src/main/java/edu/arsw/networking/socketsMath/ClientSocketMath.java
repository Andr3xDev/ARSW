package edu.arsw.networking.socketsMath;

import java.io.*;
import java.net.*;
import java.util.Scanner;

public class ClientSocketMath {

    public static void main(String[] args) {
        String host = "localhost";
        int port = 30000;

        try (
                Socket socket = new Socket(host, port);
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                Scanner scanner = new Scanner(System.in);
        ) {
            System.out.print("Wich number do you want to operate: ");
            String numero = scanner.nextLine();

            out.println(numero);

            String respuesta = in.readLine();
            System.out.println("server response: " + respuesta);

        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
