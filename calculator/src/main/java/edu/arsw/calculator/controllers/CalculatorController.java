package edu.arsw.calculator.controllers;

import edu.arsw.calculator.dtos.CalculatorRequest;
import edu.arsw.calculator.dtos.CalculatorResponse;
import edu.arsw.calculator.services.CalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*")
public class CalculatorController {

    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public ResponseEntity<CalculatorResponse> calculate(@RequestBody CalculatorRequest request) {
        try {
            double result;
            String operation = request.getOperation();

            switch (operation.toLowerCase()) {
                case "add":
                case "+":
                    result = calculatorService.add(request.getOperand1(), request.getOperand2());
                    break;
                case "subtract":
                case "-":
                    result = calculatorService.subtract(request.getOperand1(), request.getOperand2());
                    break;
                case "multiply":
                case "*":
                    result = calculatorService.multiply(request.getOperand1(), request.getOperand2());
                    break;
                case "divide":
                case "/":
                    result = calculatorService.divide(request.getOperand1(), request.getOperand2());
                    break;
                case "clear":
                case "ac":
                    result = calculatorService.clear();
                    break;
                case "sqrt":
                    result = calculatorService.sqrt(request.getOperand1());
                    break;
                case "power":
                case "pow":
                case "^":
                    result = calculatorService.power(request.getOperand1(), request.getOperand2());
                    break;
                default:
                    return ResponseEntity.badRequest()
                            .body(new CalculatorResponse("Invalid operation: " + operation));
            }

            CalculatorResponse response = new CalculatorResponse(result, operation, true);
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new CalculatorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CalculatorResponse("An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/operations")
    public ResponseEntity<CalculatorResponse> getSupportedOperations() {
        String[] operations = { "add (+)", "subtract (-)", "multiply (*)", "divide (/)", "clear (ac)", "sqrt",
                "power (^)", "percentage (%)" };
        CalculatorResponse response = new CalculatorResponse();
        response.setSuccess(true);
        response.setErrorMessage("Supported operations: " + String.join(", ", operations));
        return ResponseEntity.ok(response);
    }

}