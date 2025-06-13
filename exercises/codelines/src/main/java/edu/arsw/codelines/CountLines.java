package edu.arsw.codelines;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * A utility class with static methods to count lines of code in files.
 * <p>
 * This class provides functionality to count physical lines and logical lines of code (LOC),
 * ignoring comments and blank lines. It also includes methods to handle file paths,
 * directory traversals, and wildcard patterns.
 *
 * @author Andres Chavarro
 * @version 1.0
 * @since 2025-06-12
 */
public class CountLines {

    /**
     * Counts the total number of physical lines in a given file.
     *
     * @param filePath The path to the file to be measured.
     * @return The total number of lines in the file.
     * @throws IOException If an I/O error occurs reading the file.
     */
    public static int physical(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        return (int) Files.lines(path).count();
    }

    /**
     * Finds all files within a directory and its subdirectories that match a pattern.
     *
     * @param directory The base directory to start the search from.
     * @param pattern   The wildcard pattern to match file names against.
     * @return A list of paths for all matching files.
     */
    public static List<String> findFiles(String directory, String pattern) {
        List<String> matchingFiles = new ArrayList<>();

        String regex = pattern
                .replace(".", "\\.")
                .replace("*", ".*")
                .replace("?", ".");

        try {
            matchingFiles = Files.walk(Paths.get(directory))
                    .filter(Files::isRegularFile)
                    .map(Path::toString)
                    .filter(path -> path.matches(".*" + regex))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            System.err.println("Error searching for files: " + e.getMessage());
        }

        return matchingFiles;
    }

    /**
     * Counts the logical lines of code (LOC) in a file.
     * <p>
     * This method ignores blank lines, single-line comments and multi-line
     * block comments. It correctly handles code that appears on the
     * same line as a comment.
     *
     * @param filePath The path to the source code file.
     * @return The total number of logical lines of code.
     * @throws IOException If an I/O error occurs reading the file.
     */
    public static int logical(String filePath) throws IOException {
        int locCount = 0;
        boolean inMultiLineComment = false;

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;

            while ((line = reader.readLine()) != null) {
                line = line.trim();

                if (line.isEmpty()) {
                    continue;
                }

                if (inMultiLineComment) {
                    if (line.contains("*/")) {
                        inMultiLineComment = false;
                        String afterComment = line.substring(line.indexOf("*/") + 2).trim();
                        if (!afterComment.isEmpty() && !afterComment.startsWith("//")) {
                            locCount++;
                        }
                    }
                    continue;
                }

                if (line.startsWith("//")) {
                    continue;
                }

                if (line.startsWith("/*")) {
                    inMultiLineComment = true;
                    if (line.contains("*/")) {
                        inMultiLineComment = false;
                        String afterComment = line.substring(line.indexOf("*/") + 2).trim();
                        if (!afterComment.isEmpty() && !afterComment.startsWith("//")) {
                            locCount++;
                        }
                    }
                    continue;
                }

                if (line.contains("//")) {
                    String beforeComment = line.substring(0, line.indexOf("//")).trim();
                    if (!beforeComment.isEmpty()) {
                        locCount++;
                    }
                    continue;
                }
                
                if (line.contains("/*")) {
                    inMultiLineComment = true;
                    if (line.contains("*/")) {
                        inMultiLineComment = false;
                        String beforeComment = line.substring(0, line.indexOf("/*")).trim();
                        String afterComment = line.substring(line.indexOf("*/") + 2).trim();

                        if (!beforeComment.isEmpty() || (!afterComment.isEmpty() && !afterComment.startsWith("//"))) {
                            locCount++;
                        }
                    } else {
                        String beforeComment = line.substring(0, line.indexOf("/*")).trim();
                        if (!beforeComment.isEmpty()) {
                            locCount++;
                        }
                    }
                    continue;
                }

                locCount++;
            }
        }

        return locCount;
    }


    /**
     * Processes a given path, which can be a single file, a directory, or a pattern.
     * <p>
     * This method acts as a dispatcher. It determines the nature of the path and
     * invokes the appropriate counting logic, printing results to the console.
     *
     * @param pathOrPattern The file path, directory path, or wildcard pattern to process.
     * @param countType     The type of count to perform ("phy" or "loc").
     * @throws IOException If an I/O error occurs during file processing.
     */
    public static void processPath(String pathOrPattern, String countType) throws IOException {
        File file = new File(pathOrPattern);

        if (file.isFile()) {
            int count;
            if ("phy".equalsIgnoreCase(countType)) {
                count = physical(pathOrPattern);
                System.out.println("Physical lines in " + pathOrPattern + ": " + count);
            } else if ("loc".equalsIgnoreCase(countType)) {
                count = logical(pathOrPattern);
                System.out.println("Lines of code in " + pathOrPattern + ": " + count);
            } else {
                System.out.println("Invalid count type. Use 'phy' or 'loc'.");
            }
        } else if (file.isDirectory()) {
            System.out.println("Processing all files in directory: " + pathOrPattern);

            List<String> allFiles = Files.walk(Paths.get(pathOrPattern))
                    .filter(Files::isRegularFile)
                    .map(Path::toString)
                    .collect(Collectors.toList());

            for (String filePath : allFiles) {
                processPath(filePath, countType);
            }
        } else {
            if (pathOrPattern.contains("*") || pathOrPattern.contains("?")) {
                String directory = ".";
                String pattern = pathOrPattern;

                int lastSlashIndex = pathOrPattern.lastIndexOf(File.separator);
                if (lastSlashIndex >= 0) {
                    directory = pathOrPattern.substring(0, lastSlashIndex);
                    pattern = pathOrPattern.substring(lastSlashIndex + 1);
                }

                List<String> matchingFiles = findFiles(directory, pattern);

                if (matchingFiles.isEmpty()) {
                    System.out.println("No files matching the pattern were found.");
                } else {
                    for (String filePath : matchingFiles) {
                        processPath(filePath, countType);
                    }
                }
            } else {
                System.out.println("File not found: " + pathOrPattern);
            }
        }
    }
}
