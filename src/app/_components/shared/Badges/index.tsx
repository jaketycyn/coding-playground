import { BadgesProps } from "./types";

export const Badge = ({
  variant = "default",
  className = "",
  children,
}: BadgesProps) => {
  const variantClasses = {
    default: "bg-gray-100 text-black hover:bg-gray-200",
    success: "bg-green-600 text-black hover:bg-green-700",
    warning: "bg-yellow-400 text-black hover:bg-yellow-500",
    error: "bg-red-500 text-black hover:bg-red-600",
    outline: "border border-gray-200 text-gray-600 hover:bg-slate-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
