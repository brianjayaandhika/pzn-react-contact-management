import { Paging } from "@/lib/api/http/http.types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({
  pagination,
  page,
  setPage,
}: {
  pagination: Paging;
  page: number;
  setPage: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center w-full border-t border-white/10 px-4 py-3 sm:px-6">
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
            .fill(null)
            .map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
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
