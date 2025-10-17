type Props = {
  IconComponent: React.ComponentType;
  title: string;
  isCircle?: boolean;
  customBg?: string;
  fontSize?: string;
};

export default function PageTitle({
  IconComponent,
  title,
  isCircle = false,
  customBg = "bg-blue-500",
  fontSize = "text-2xl",
}: Props) {
  return (
    <div
      className={`flex align-middle justify-start gap-2 items-center ${fontSize} font-bold`}
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
