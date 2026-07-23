export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
}

export default function Input({ prefix, suffix, ...rest }: InputProps) {
  return (
    <div className="bg-input flex items-center rounded-[20px] p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      {prefix && (
        <span className="text-muted-foreground mr-4 text-sm font-medium">
          {prefix}
        </span>
      )}
      <input
        className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        autoFocus
        {...rest}
      />
      {suffix && (
        <span className="text-muted-foreground ml-4 text-sm font-medium">
          {suffix}
        </span>
      )}
    </div>
  );
}
