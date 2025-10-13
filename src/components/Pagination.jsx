import {
  BiLeftArrow,
  BiLeftArrowAlt,
  BiSolidLeftArrowAlt,
} from "react-icons/bi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({ pagination, page, setPage }) {
  return (
    <div className="flex items-center justify-center w-full border-t border-white/10 px-4 py-3 sm:px-6">
      {/* Prev / Next button for mobile */}
      {/* <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          href="#"
          className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
          >
          Previous
        </button>
        <button
          type="button"
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
        >
          Next
        </button>
      </div> */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md"
        >
          <button
            onClick={() => {
              page > 0 && setPage(page - 1);
            }}
            disabled={page < 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 disabled:text-gray-400/25 cursor-pointer disabled:cursor-auto"
          >
            <MdKeyboardArrowLeft />
          </button>
          {Array(pagination?.totalPage)
            .fill()
            .map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                aria-current={page === index && "page"}
                className={`${
                  page === index
                    ? "relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 cursor-pointer"
                }`}
              >
                {index + 1}
              </button>
            ))}
          <button
            onClick={() => {
              page < pagination?.totalPage - 1 && setPage(page + 1);
            }}
            disabled={page === pagination?.totalPage - 1}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 disabled:text-gray-400/25 cursor-pointer disabled:cursor-auto"
          >
            <MdKeyboardArrowRight />
          </button>
        </nav>
      </div>
    </div>
  );
}
