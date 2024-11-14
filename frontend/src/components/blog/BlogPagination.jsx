import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const BlogPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center">
      <ul className="flex justify-center items-center list-none px-4">
        <li
          onClick={handlePrev}
          className={`${
            currentPage === 1 ? "text-gray-300" : "text-gray-400"
          }  bg-white p-3 rounded-sm cursor-pointer hover:text-white hover:bg-greenMango`}
        >
          <MdChevronLeft />
        </li>

        {/* Display page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={` m-1 py-2 px-4 rounded cursor-pointer ${
              currentPage === index + 1
                ? "bg-greenMango text-white"
                : "hover:bg-greenMango hover:border-greenMango text-gray-400 hover:text-white"
            }`}
          >
            {index + 1}
          </li>
        ))}

        <li
          onClick={handleNext}
          className={`${
            currentPage === totalPages ? "text-gray-300" : "text-gray-400"
          }  bg-white rounded-sm p-3  cursor-pointer hover:text-white hover:bg-greenMango`}
        >
          <MdChevronRight />
        </li>
      </ul>
    </div>
  );
};

export default BlogPagination;
