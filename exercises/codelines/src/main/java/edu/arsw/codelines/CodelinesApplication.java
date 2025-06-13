package edu.arsw.codelines;

import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class and entry point for the code line counting application.
 * <p>
 * This class initializes the Spring Boot context and handles the
 * CLI logic, validating arguments and delegating
 * file processing.
 *
 * @author Andres Chavarro
 * @version 1.0
 * @since 2025-06-12
 */
@SpringBootApplication
public class CodelinesApplication {

    /**
     * The main entry point for the program.
     * <p>
     * It validates that exactly two command line arguments are provided
     * and then invokes the counting process. If the arguments are incorrect or
     * if a file reading error occurs, the program will terminate and display
     * an error message.
     *
     * @param args A string array with the command-line arguments:
     * <ul>
     * <li>args[0]: The count type ('phy' for physical or 'loc' for logical).</li>
     * <li>args[1]: The path or pattern of the files to be processed.</li>
     * </ul>
     */
    public static void main(String[] args) {
        SpringApplication.run(CodelinesApplication.class, args);

        if (args.length != 2) {
            System.err.println("Error: Two arguments are required.");
            System.err.println("Usage: java CountLinesApp <phy|loc> <file_pattern>");
            return;
        }

        String countType = args[0];
        String pattern = args[1];

        try {
            CountLines.processPath(pattern, countType);
        } catch (IOException e) {
            System.err.println("Error processing the file(s): " + e.getMessage());
            System.exit(1);
        }
    }
}
