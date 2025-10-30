import _ from "lodash";

export default function Badge({
  label,
  customCn,
  onClick,
}: {
  label: string | number;
  customCn?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${customCn} transition-all duration-200 ease-in py-1 px-3 bg-gray-700 border border-gray-600 rounded-2xl text-sm font-bold cursor-default`}
    >
      {_.startCase(_.toLower(label.toString()))}
    </button>
  );
}
