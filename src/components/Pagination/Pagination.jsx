import React, { useState, useEffect } from 'react';

function Pagination({ blogsPerPage, totalBlogs, paginate }) {
     const [pageNumber, setPageNumber] = useState(1);
     const [pageNumbers, setPageNumbers] = useState([]);

     useEffect(() => {
          const numbers = [];
          for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
               numbers.push(i);
          }
          setPageNumbers(numbers);
     }, [totalBlogs, blogsPerPage]);

     const handlePaginate = (number) => {
          setPageNumber(number);
          paginate(number);
     };

     return (
          <div className="pagination">
               {pageNumbers.map((number) => (
                    <div key={number} className={`page-item ${pageNumber === number ? 'active' : ''}`}>
                         <button onClick={() => handlePaginate(number)} className="page-link">
                              {number}
                         </button>
                    </div>
               ))}
          </div>
     );
}

export default Pagination;