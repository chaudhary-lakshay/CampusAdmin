package in.lakshay.custom.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import in.lakshay.exception.StudentNotFoundException;  

/**
 * common catch block code
 *
 */
@RestControllerAdvice
public class MyCustomExceptionHandler {

    @ExceptionHandler(StudentNotFoundException.class)  
    public ResponseEntity<String> handleStudentNotFoundException(
            StudentNotFoundException e) {
        
        return new ResponseEntity<String>(
                e.getMessage(),
                HttpStatus.NOT_FOUND);
    }
}
