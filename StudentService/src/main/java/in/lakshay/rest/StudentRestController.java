package in.lakshay.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.lakshay.entity.Student;
import in.lakshay.exception.StudentNotFoundException;
import in.lakshay.service.IStudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/student")
public class StudentRestController {

	@Autowired
	private IStudentService service;

	@PostMapping("/create")
	public ResponseEntity<String> createStudent(@RequestBody Student student) {
		Long id = service.createStudent(student);
		String message = "Student '"+id+"' created!";
		return new ResponseEntity<String>(message,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<StudentPageResponse> findAllStudents(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size) {
	    Page<Student> studentPage = service.findStudentsWithPagination(page, size);
	    StudentPageResponse response = new StudentPageResponse(
	            studentPage.getContent(),
	            studentPage.getNumber(),
	            studentPage.getTotalElements(),
	            studentPage.getTotalPages());

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}


	
	@GetMapping("/find/{id}")
	public ResponseEntity<?> findOneStudent(@PathVariable Long id) {
		Student student = service.findOneStudent(id);
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
		service.deleteOneStudent(id);
		return new ResponseEntity<String>("Student Deleted",HttpStatus.OK);
	}
 	
	@PutMapping("/modify")
	public ResponseEntity<String> updateStudent(@RequestBody Student student) {
		service.updateStudent(student);
		return new ResponseEntity<String>("Student Updated!",HttpStatus.OK);
	}
	
	@PatchMapping("/modify/name/{id}/{name}")
	public ResponseEntity<String> updateStudentName(@PathVariable Long id, @PathVariable String name) {
		service.updateStudentName(name, id);
		return new ResponseEntity<String>("Student Name Updated!",HttpStatus.OK);
	}
}

