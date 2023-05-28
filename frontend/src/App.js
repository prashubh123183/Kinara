import React, { useState, useEffect } from 'react';
import Api from './Api';

function App() {
  const [students, setStudents] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    name: '',
    id: '',
    totalMarks: '',
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch the initial student data
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await Api.get(`/api/students?page=${pageNumber}&size=${pageSize}`);
      const data = response.data;
      setStudents(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handlePageChange = (event) => {
    setPageNumber(Number(event.target.value));
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Api.post('/api/students/filter', { filterCriteria, page: pageNumber, size: pageSize });
      const data = response.data;
      setStudents(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error filtering students:', error);
    }
  };

  const renderStudents = () => {
    return students.map((student) => (
      <tr key={student.id}>
        <td>{student.id}</td>
        <td>{student.name}</td>
        <td>{student.totalMarks}</td>
      </tr>
    ));
  };

  return (
    <div>
      <form onSubmit={handleFilterSubmit}>
        <input type="text" name="name" value={filterCriteria.name} onChange={handleFilterChange} placeholder="Name" />
        <input type="text" name="id" value={filterCriteria.id} onChange={handleFilterChange} placeholder="ID" />
        <input
          type="text"
          name="totalMarks"
          value={filterCriteria.totalMarks}
          onChange={handleFilterChange}
          placeholder="Total Marks"
        />
        <button type="submit">Filter</button>
      </form>
      <table border="1" width="200" align="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {renderStudents()}
        </tbody>
      </table>

      <div>
        <label htmlFor="page">Page:</label>
        <input id="page" type="number" value={pageNumber} onChange={handlePageChange} />
      </div>

      <div>
        <label htmlFor="pageSize">Page Size:</label>
        <input id="pageSize" type="number" value={pageSize} onChange={handlePageSizeChange} />
      </div>

      <div>
        <button onClick={loadStudents}>Load Students</button>
      </div>

      <div>
        <button disabled={pageNumber === 0} onClick={() => setPageNumber(pageNumber - 1)}>Previous Page</button>
        <button disabled={pageNumber === totalPages - 1} onClick={() => setPageNumber(pageNumber + 1)}>Next Page</button>
      </div>
    </div>
  );
}

export default App;

