import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={goToPrevious} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={goToNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
