import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const generatePagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (showLeftDots && !showRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  };

  const pages = generatePagination();

  if (totalPages === 0) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md border transition-all duration-200
          ${
            currentPage === 1
              ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="hidden sm:flex space-x-2">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-2 py-2 text-gray-400">
                <MoreHorizontal size={20} />
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-colors duration-200
                ${
                  currentPage === page
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <div className="sm:hidden flex items-center text-sm text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md border transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
