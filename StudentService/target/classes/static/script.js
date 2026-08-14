const apiUrl = "http://localhost:8080/api/student";

        // Load Students on Page Load
        document.addEventListener("DOMContentLoaded", loadStudents(page = 0, size = 5));

		// Add/Edit Student Form Submission
		document.getElementById("studentForm").addEventListener("submit", async (event) => {
		    event.preventDefault();

		    const studentId = document.getElementById("studentId").value;
		    const student = {
		        studentId: studentId || null,
		        studentName: document.getElementById("name").value,
		        studentAge: document.getElementById("age").value,
		        studentGender: document.getElementById("gender").value,
		        studentDept: document.getElementById("dept").value,
		        studentAddr: document.getElementById("address").value,
		    };

		    const endpoint = studentId ? `${apiUrl}/modify` : `${apiUrl}/create`;
		    const method = studentId ? "PUT" : "POST";

		    try {
		        const response = await fetch(endpoint, {
		            method: method,
		            headers: { "Content-Type": "application/json" },
		            body: JSON.stringify(student),
		        });

		        if (response.ok) {
		            alert("Student saved successfully!");
		            document.getElementById("studentForm").reset();
		            loadStudents();
		        } else {
		            throw new Error("Failed to save student.");
		        }
		    } catch (error) {
		        alert(error.message);
		    }

		    const modal = bootstrap.Modal.getInstance(document.getElementById("studentModal"));
		    modal.hide();
		});

		let currentPage = 0;
		const pageSize = 5;

		async function loadStudents(page = 0, size = 5) {
		    try {
		        const response = await fetch(`${apiUrl}/all?page=${page}&size=${size}`);
		        const data = await response.json();

		        const students = data.students;
		        const totalPages = data.totalPages;

		        const tableBody = document.getElementById("studentTableBody");
		        tableBody.innerHTML = "";

		        students.forEach(student => {
		            const row = document.createElement("tr");
		            row.innerHTML = `
		                <td>${student.studentId}</td>
		                <td>${student.studentName}</td>
		                <td>${student.studentAge}</td>
		                <td>${student.studentGender}</td>
		                <td>${student.studentDept}</td>
		                <td>${student.studentAddr}</td>
		                <td>
		                    <button class="btn btn-warning btn-sm" onclick="editStudent(${student.studentId})">Edit</button>
		                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.studentId})">Delete</button>
		                </td>
		            `;
		            tableBody.appendChild(row);
		        });

		        // Update pagination controls
		        updatePaginationControls(page, totalPages);
		    } catch (error) {
		        console.error("Failed to load students:", error);
		    }
		}


        // Delete Student
        async function deleteStudent(id) {
            try {
                const response = await fetch(`${apiUrl}/remove/${id}`, { method: "DELETE" });

                if (response.ok) {
                    alert("Student deleted successfully!");
                    loadStudents();
                } else {
                    throw new Error("Failed to delete student.");
                }
            } catch (error) {
                alert(error.message);
            }
        }

        // Edit Student
        async function editStudent(id) {
            try {
                const response = await fetch(`${apiUrl}/find/${id}`);
                const student = await response.json();

                document.getElementById("studentId").value = student.studentId;
                document.getElementById("name").value = student.studentName;
                document.getElementById("age").value = student.studentAge;
                document.getElementById("gender").value = student.studentGender;
                document.getElementById("dept").value = student.studentDept;
                document.getElementById("address").value = student.studentAddr;

                const modal = new bootstrap.Modal(document.getElementById("studentModal"));
                modal.show();
            } catch (error) {
                alert("Failed to fetch student details.");
            }
        }

		// Find Student by ID Function
		async function findStudentById(event) {
		    event.preventDefault();

		    const searchId = document.getElementById("searchId").value;

		    if (!searchId) {
		        alert("Please enter a valid ID.");
		        return;
		    }

		    try {
		        const response = await fetch(`${apiUrl}/find/${searchId}`);
		        if (response.ok) {
		            const student = await response.json();

		            const searchResult = document.getElementById("searchResult");
		            searchResult.innerHTML = `
		                <p><strong>ID:</strong> ${student.studentId}</p>
		                <p><strong>Name:</strong> ${student.studentName}</p>
		                <p><strong>Age:</strong> ${student.studentAge}</p>
		                <p><strong>Gender:</strong> ${student.studentGender}</p>
		                <p><strong>Department:</strong> ${student.studentDept}</p>
		                <p><strong>Address:</strong> ${student.studentAddr}</p>
		            `;

		            // Show the search result modal
		            const searchResultModal = new bootstrap.Modal(document.getElementById("searchResultModal"));
		            searchResultModal.show();
		        } else {
		            throw new Error("Student not found.");
		        }
		    } catch (error) {
		        alert(error.message);
		    }
		}
		
		
		function updatePaginationControls(page, totalPages) {
		    currentPage = page;

		    // Update page info
		    document.getElementById("pageInfo").textContent = `Page ${page + 1} of ${totalPages}`;

		    // Enable/disable buttons
		    document.getElementById("prevPage").disabled = page === 0;
		    document.getElementById("nextPage").disabled = page + 1 >= totalPages;
		}

		function loadPreviousPage() {
		    if (currentPage > 0) {
		        loadStudents(currentPage - 1, pageSize);
		    }
		}

		function loadNextPage() {
		    loadStudents(currentPage + 1, pageSize);
		}
	
