type Props = {
  variant: string;
  text?: string;
  IconComponent?: React.ComponentType<{ size?: string }>;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  customStyle?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  variant = "blue",
  text,
  IconComponent,
  handleClick = () => {},
  type = "button",
  disabled = false,
  customStyle = "",
}: Props) {
  let buttonStyle =
    variant === "blue"
      ? "bg-blue-800 hover:bg-blue-800/80"
      : variant === "red"
      ? "bg-red-600 hover:bg-red-600/80"
      : "bg-gray-700 hover:bg-gray-700/80";

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={(event) => {
        event.stopPropagation();
        handleClick(event);
      }}
      className={`w-full px-4 flex gap-2 justify-center items-center align-middle py-2 rounded-md mt-2 mb-4 cursor-pointer hover:-translate-y-[2px] ease-in duration-100 ${buttonStyle} ${customStyle}`}
    >
      {IconComponent ? <IconComponent size="16px" /> : null}
      {text && <p className="text-sm font-semibold">{text}</p>}
    </button>
  );
}
