import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full flex gap-1 text-center justify-center align-middle items-center py-8 ">
      <FaRegCopyright color="gray" size="12px" />
      <p className="text-gray-500 text-xs">
        2025 Contact Management. All Rights Reserved
      </p>
    </footer>
  );
}
