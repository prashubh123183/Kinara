
	package com.cdac.inshine.model;

	import jakarta.persistence.Entity;

	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;

	@Entity
	@Table(name = "students")
	public class Student {
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		private String name;
		private int marks;
		
		public Student(Long id, String name, int marks) {
			super();
			this.id = id;
			this.name = name;
			this.marks = marks;
		}
		
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getMarks() {
			return marks;
		}
		public void setMarks(int marks) {
			this.marks = marks;
		}

		@Override
		public String toString() {
			return "Student [id=" + id + ", name=" + name + ", marks=" + marks + "]";
		}
		
				

	}