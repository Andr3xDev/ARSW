package edu.arsw.networking;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

public class Browser {

    public static void createHtml(String url) throws MalformedURLException, IOException {
        File archivo = new File("resultado.html");
        BufferedWriter bw = new BufferedWriter(new FileWriter(archivo));
        URL newUrl = new URL(url);
        try (BufferedReader reader
                = new BufferedReader(new InputStreamReader(newUrl.openStream()))) {
            String inputLine = null;
            while ((inputLine = reader.readLine()) != null) {
                bw.write(inputLine);
            }
            bw.close();
        } catch (IOException x) {
            System.err.println(x);
        }
    }
}
