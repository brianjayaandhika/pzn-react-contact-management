export default function PageTitle({
  IconComponent,
  title,
  isCircle = false,
  customBg = "bg-blue-500",
  fontSize = "text-2xl",
}) {
  return (
    <div
      className={`flex align-middle justify-start gap-2 items-center ${
        fontSize ? fontSize : "text-2xl"
      } font-bold`}
    >
      <div
        className={`${
          isCircle ? `rounded-full p-2 ${customBg} text-white` : "text-blue-400"
        } flex justify-center items-center align-middle`}
      >
        {IconComponent ? <IconComponent /> : null}
      </div>
      <p className="text-white">{title}</p>
    </div>
  );
}
