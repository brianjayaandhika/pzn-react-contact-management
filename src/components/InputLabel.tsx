type Props = {
  IconComponent?: React.ComponentType<{
    size?: string;
    style?: { color: string };
  }>;
  mapper: string;
  text: string;
  type: string;
  placeholderText?: string;
  value?: string | number;
  isRequired?: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fontSize?: string;
  customStyle?: string;
  isTextArea?: boolean;
  rows?: number;
  isReadOnly?: boolean;
};

export default function InputLabel({
  IconComponent,
  mapper = "",
  text = "",
  type = "",
  placeholderText = "",
  value,
  isRequired = false,
  handleChange,
  fontSize = "text-xs",
  customStyle = "",
  isTextArea = false,
  rows,
  isReadOnly = false,
}: Props) {
  return (
    <div
      className={`${customStyle} w-full flex flex-col justify-start items-start gap-2`}
    >
      <label htmlFor={mapper} className={`${fontSize}`}>
        {text}
      </label>
      <div
        className={`${fontSize}
           flex gap-4 justify-start items-center align-middle focus-within:border-blue-400 border border-gray-600 rounded-sm w-full px-2 py-3 text-gray-300 bg-gray-700/50`}
      >
        {IconComponent
          ? !isTextArea && (
              <IconComponent style={{ color: "gray" }} size="12px" />
            )
          : null}
        {isTextArea ? (
          <textarea
            rows={rows ?? 3}
            id={mapper}
            name={mapper}
            value={value}
            placeholder={placeholderText}
            required={isRequired}
            onChange={handleChange}
            className="w-full outline-none resize-none scrollbar pr-1"
          />
        ) : (
          <input
            className="text-white w-full border-0 outline-none bg-transparent"
            type={type || "text"}
            id={mapper}
            name={mapper}
            placeholder={placeholderText}
            value={value}
            required={isRequired}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        )}
      </div>
    </div>
  );
}
