package com.cdac.inshine.dao;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.inshine.model.Student;


	public interface StudentRepository extends JpaRepository<Student, Long>{

		Page<Student> findByNameContainingIgnoreCase(String filterCriteria, PageRequest pageRequest);

	}



