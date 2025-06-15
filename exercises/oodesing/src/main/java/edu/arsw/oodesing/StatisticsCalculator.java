package edu.arsw.oodesing;

import java.util.List;

/**
 * A utility class to perform statistical calculations using Java Streams and Lambdas.
 * This approach results in more concise and declarative code.
 */
public class StatisticsCalculator {

    /**
     * Default constructor.
     */
    public StatisticsCalculator() {
        // Constructor is empty as this is a utility class.
    }
    
    /**
     * Calculates the mean (average) of a list of numbers using the Stream API.
     *
     * @param numbers A list of Double values.
     * @return The mean of the numbers. Returns 0.0 if the list is empty.
     */
    public double calculateMean(List<Double> numbers) {
        if (numbers == null || numbers.isEmpty()) {
            return 0.0;
        }

        // .average() returns an OptionalDouble to handle the case of an empty stream safely.
        // We use .orElse(0.0) to get the value or a default if the Optional is empty.
        return numbers.stream()
                      .mapToDouble(Double::doubleValue)
                      .average()
                      .orElse(0.0);
    }

    /**
     * Calculates the sample standard deviation using the Stream API.
     *
     * @param numbers A list of Double values.
     * @return The standard deviation. Returns 0.0 if the list has fewer than 2 elements.
     */
    public double calculateStandardDeviation(List<Double> numbers) {
        if (numbers == null || numbers.size() < 2) {
            return 0.0;
        }

        double mean = calculateMean(numbers);

        // First, we stream the numbers and for each one, we calculate the square of its difference from the mean.
        // Then, we sum all those results.
        double sumOfSquaredDifferences = numbers.stream()
                                                .mapToDouble(Double::doubleValue)
                                                .map(number -> Math.pow(number - mean, 2))
                                                .sum();

        return Math.sqrt(sumOfSquaredDifferences / (numbers.size() - 1));
    }
}
