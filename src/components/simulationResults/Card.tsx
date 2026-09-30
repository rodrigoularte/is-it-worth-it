import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
  variant?: "default" | "primary" | "ghost";
}

const variantClasses = {
  default: {
    card: "bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]",
    accent: "text-primary",
    value: "text-foreground",
    subtitle: "text-muted-foreground",
  },
  primary: {
    card: "bg-primary rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]",
    accent: "text-primary-foreground",
    value: "text-primary-foreground",
    subtitle: "text-primary-foreground/70",
  },
  ghost: {
    card: "bg-card py-6",
    accent: "text-primary",
    value: "text-foreground",
    subtitle: "text-muted-foreground",
  },
};

export default function Card({
  icon: Icon,
  label,
  value,
  subtitle,
  variant = "default",
}: Props) {
  const styles = variantClasses[variant];

  return (
    <div className={styles.card}>
      <div className="mb-3 flex items-center gap-2">
        <Icon size={16} className={styles.accent} />
        <span
          className={[
            "text-xs font-semibold tracking-widest uppercase",
            styles.accent,
          ].join(" ")}>
          {label}
        </span>
      </div>
      <p className={["text-3xl font-semibold", styles.value].join(" ")}>
        {value}
      </p>
      <p className={["mt-1 text-sm", styles.subtitle].join(" ")}>{subtitle}</p>
    </div>
  );
}
