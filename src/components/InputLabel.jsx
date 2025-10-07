export default function InputLabel({
  IconComponent,
  mapper,
  text,
  type,
  placeholderText,
}) {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <label htmlFor={mapper} className="text-xs">
        {text}
      </label>
      <div className="flex gap-4 justify-start items-center align-middle border border-gray-600 rounded-sm w-full px-2 py-3 text-gray-200 bg-gray-700 bg-opacity-50">
        {IconComponent ? (
          <IconComponent className="text-gray-200" size="12px" />
        ) : (
          "icon"
        )}
        <input
          className="text-xs"
          type={type || "text"}
          id={mapper}
          name={mapper}
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
}
