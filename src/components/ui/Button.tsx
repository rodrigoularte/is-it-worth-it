import type { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  iconOnRight?: boolean;
}

const baseClasses =
  "flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm gap-2 cursor-pointer transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses = {
  primary: "bg-primary text-primary-foreground font-semibold rounded-[20px]",
  secondary: "bg-secondary-button border border-border rounded-3xl",
  ghost: "rounded-lg text-foreground",
};

export default function Button({
  variant = "primary",
  icon: Icon,
  iconOnRight = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {Icon && !iconOnRight && <Icon size={20} />}
      {children}
      {Icon && iconOnRight && <Icon size={20} />}
    </button>
  );
}
