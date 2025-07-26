package edu.arsw.networking;

import java.util.Scanner;

public class UrlToFileSaver {
    public static void main(String[] args) throws Exception {
        file();
    }

    public static void file() throws Exception {
        Scanner reader = new Scanner(System.in);
        System.out.println("Ingrese URL: ");
        String url = reader.next();
        Browser.createHtml(url);
        reader.close();
    }
}
