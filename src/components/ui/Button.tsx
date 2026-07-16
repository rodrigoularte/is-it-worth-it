import type { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
}

const baseClasses =
  "flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm gap-2 cursor-pointer transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80";

const variantClasses = {
  primary: "bg-primary text-primary-foreground font-semibold rounded-xl",
  secondary: "bg-secondary-button border border-border rounded-3xl",
  ghost: "rounded-lg text-foreground",
};

export default function Button({
  variant = "primary",
  icon: Icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}
