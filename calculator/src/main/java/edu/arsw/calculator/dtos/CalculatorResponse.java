package edu.arsw.calculator.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CalculatorResponse {

    private double result;
    private String operation;
    private boolean success;
    private String errorMessage;

    public CalculatorResponse(double result, String operation, boolean success) {
        this.result = result;
        this.operation = operation;
        this.success = success;
    }

    public CalculatorResponse(String errorMessage) {
        this.success = false;
        this.errorMessage = errorMessage;
    }

    public boolean isSuccess() {
        return success;
    }

}