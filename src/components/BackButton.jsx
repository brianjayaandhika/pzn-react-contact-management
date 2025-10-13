import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function BackButton({ text, path }) {
  const navigate = useNavigate();
  return (
    <button
      className="flex align-middle justify-start gap-2 items-center text-blue-400 text-sm cursor-pointer"
      onClick={() => navigate(path)}
    >
      <FaArrowCircleLeft />
      <p>{text}</p>
    </button>
  );
}
