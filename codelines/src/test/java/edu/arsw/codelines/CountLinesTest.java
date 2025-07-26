package edu.arsw.codelines;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test suite for the CountLines utility class.
 */
class CountLinesTest {

    @TempDir
    Path tempDir;

    //--- Tests for physical method ---

    @Test
    void should_countAllLines_when_fileIsNotEmpty() throws IOException {
        String content = "line 1\nline 2\n\nline 4";
        Path file = tempDir.resolve("testfile.txt");
        Files.writeString(file, content);

        int lineCount = CountLines.physical(file.toString());

        assertEquals(4, lineCount);
    }

    @Test
    void should_returnZero_when_fileIsEmpty() throws IOException {
        Path file = tempDir.resolve("empty.txt");
        Files.writeString(file, "");

        int lineCount = CountLines.physical(file.toString());
        assertEquals(0, lineCount);
    }

    //--- Tests for logical method ---

    @Test
    void should_ignoreBlanksAndSingleComments() throws IOException {
        String content = "public class Test {\n" +
                         "    // This is a comment\n" +
                         "    private int x;\n" +
                         "\n" + // Blank line
                         "    public void method() {\n" +
                         "        x = 1; // Set x\n" +
                         "    }\n" +
                         "}";
        Path file = tempDir.resolve("test.java");
        Files.writeString(file, content);

        int locCount = CountLines.logical(file.toString());
        assertEquals(6, locCount);
    }

    @Test
    void should_ignoreMultiLineComments() throws IOException {
        String content = "/*\n" +
                         " * This is a multi-line comment.\n" +
                         " * It should all be ignored.\n" +
                         " */\n" +
                         "package com.example;\n" +
                         "\n" +
                         "public class Main { }\n";
        Path file = tempDir.resolve("Main.java");
        Files.writeString(file, content);

        int locCount = CountLines.logical(file.toString());
        assertEquals(2, locCount);
    }

    @Test
    void should_countCode_when_onSameLineAsComment() throws IOException {
        String content = "int i = 0; // A comment\n" +
                         "String s = \"Hello\"; /* Another comment */";
        Path file = tempDir.resolve("inline.java");
        Files.writeString(file, content);

        int locCount = CountLines.logical(file.toString());
        assertEquals(2, locCount);
    }
    
    @Test
    void should_returnZero_when_fileHasOnlyComments() throws IOException {
        String content = "// Main class\n" +
                         "/* \n" +
                         "  Author: Test \n" +
                         "*/\n";
        Path file = tempDir.resolve("only_comments.java");
        Files.writeString(file, content);
        
        int locCount = CountLines.logical(file.toString());
        assertEquals(0, locCount);
    }

    //--- Tests for findFiles method ---

    @Test
    void should_findFiles_with_simpleWildcard() throws IOException {
        Files.createFile(tempDir.resolve("File1.java"));
        Files.createFile(tempDir.resolve("File2.java"));
        Files.createFile(tempDir.resolve("config.properties"));

        List<String> foundFiles = CountLines.findFiles(tempDir.toString(), "*.java");

        assertEquals(2, foundFiles.size());
        assertTrue(foundFiles.stream().anyMatch(p -> p.endsWith("File1.java")));
        assertTrue(foundFiles.stream().anyMatch(p -> p.endsWith("File2.java")));
    }
}
