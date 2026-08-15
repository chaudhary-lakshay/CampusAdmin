package in.lakshay.rest;

import java.util.List;

import in.lakshay.entity.Student;

public class StudentPageResponse {

	private final List<Student> students;
	private final int currentPage;
	private final long totalItems;
	private final int totalPages;

	public StudentPageResponse(List<Student> students, int currentPage, long totalItems, int totalPages) {
		this.students = students;
		this.currentPage = currentPage;
		this.totalItems = totalItems;
		this.totalPages = totalPages;
	}

	public List<Student> getStudents() {
		return students;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public long getTotalItems() {
		return totalItems;
	}

	public int getTotalPages() {
		return totalPages;
	}
}
