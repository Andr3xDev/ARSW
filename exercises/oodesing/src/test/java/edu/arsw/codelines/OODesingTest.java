package edu.arsw.codelines;

import org.junit.jupiter.api.Test;
import edu.arsw.oodesing.StatisticsCalculator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;


/**
 * Test suite for the OODesing class.
 */
class CountLinesTest {
    private StatisticsCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new StatisticsCalculator();
    }

    @Test
    @DisplayName("Test Mean for Table 1, Column 1")
    void testMeanForColumn1() {
        List<Double> data = Arrays.asList(160.0, 591.0, 114.0, 229.0, 230.0, 270.0, 128.0, 1657.0, 624.0, 1503.0);
        double expectedMean = 550.6;

        double actualMean = calculator.calculateMean(data);

        assertEquals(expectedMean, actualMean, 0.01, "The calculated mean for Column 1 should match the expected value.");
    }

    @Test
    @DisplayName("Test Standard Deviation for Table 1, Column 1")
    void testStdDevForColumn1() {
        List<Double> data = Arrays.asList(160.0, 591.0, 114.0, 229.0, 230.0, 270.0, 128.0, 1657.0, 624.0, 1503.0);
        double expectedStdDev = 572.03;

        double actualStdDev = calculator.calculateStandardDeviation(data);

        assertEquals(expectedStdDev, actualStdDev, 0.01, "The calculated standard deviation for Column 1 should match the expected value.");
    }

    @Test
    @DisplayName("Test Mean for Table 1, Column 2")
    void testMeanForColumn2() {
        List<Double> data = Arrays.asList(15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2);
        double expectedMean = 60.32;

        double actualMean = calculator.calculateMean(data);

        assertEquals(expectedMean, actualMean, 0.01, "The calculated mean for Column 2 should match the expected value.");
    }

    @Test
    @DisplayName("Test Standard Deviation for Table 1, Column 2")
    void testStdDevForColumn2() {
        List<Double> data = Arrays.asList(15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2);
        double expectedStdDev = 62.26;

        double actualStdDev = calculator.calculateStandardDeviation(data);

        assertEquals(expectedStdDev, actualStdDev, 0.01, "The calculated standard deviation for Column 2 should match the expected value.");
    }

}
