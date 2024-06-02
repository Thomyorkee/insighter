import React from "react";
import Tooltip from "../tooltip";
import "../../scss/pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate,}) => {
  return (
    <nav>
      <ul className="pagination">
        {/* 첫 번째 페이지로 가는 버튼 */}
        <Tooltip text="첫 페이지로">
          <li className="page-item">
            <p
              onClick={() => currentPage !== 1 && paginate(1)}
              className="page-link _cp"
            >
              &laquo;
            </p>
          </li>
        </Tooltip>
        {/* 페이지 이동 버튼 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${
              index + 1 === currentPage ? "selected" : ""
            }`}
          >
            <p onClick={() => paginate(index + 1)} className="page-link _cp">
              {index + 1}
            </p>
          </li>
        ))}
        {/* 마지막 페이지로 가는 버튼 */}
        <Tooltip text="마지막 페이지로">
          <li className="page-item">
            <p
              onClick={() => currentPage !== totalPages && paginate(totalPages)}
              className="page-link _cp"
            >
              &raquo;
            </p>
          </li>
        </Tooltip>
      </ul>
    </nav>
  );
};

export default Pagination;
