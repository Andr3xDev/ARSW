package edu.arsw.oodesing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class OODesingApplication {

    public static void main(String[] args) {
        SpringApplication.run(OODesingApplication.class, args);

        if (args.length == 0) {
            System.err.println("Error: Please provide a file path as an argument.");
            System.exit(1);
        }

        String filePathString = args[0];
        Path filePath = Paths.get(filePathString);

        List<Double> numbers = new CustomLinkedList<>();
        StatisticsCalculator calculator = new StatisticsCalculator();

        try {
            Files.lines(filePath).forEach(line -> {
                try {
                    numbers.add(Double.parseDouble(line.trim()));
                } catch (NumberFormatException e) {
                    System.err.println("Warning: Skipping invalid number in file: " + line);
                }
            });
        } catch (IOException e) {
            System.err.println("Error reading the file: " + e.getMessage());
            System.exit(1);
        }
        
        double mean = calculator.calculateMean(numbers);
        double stdDev = calculator.calculateStandardDeviation(numbers);

        System.out.println("Data analysis for file: " + filePathString);
        System.out.println("------------------------------------");
        System.out.println("Numbers read: " + numbers.size());
        System.out.printf("Mean: %.2f%n", mean);
        System.out.printf("Standard Deviation: %.2f%n", stdDev);
    }
}
