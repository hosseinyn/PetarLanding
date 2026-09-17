import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success";
  href?: string;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-6 py-3 text-base font-medium transition duration-700 focus-visible:outline-2 focus-visible:outline-offset-3 disabled:cursor-not-allowed";

const variants: Record<string, string> = {
  primary:
    "bg-sky-400 text-white hover:bg-sky-500 active:bg-sky-500 disabled:bg-black/35 disabled:text-white",
  secondary:
    "border border-gray-200 bg-white text-black hover:border-sky-400 hover:text-sky-700 active:border-sky-400 disabled:text-black/35 disabled:border-gray-200",
  success:
    "bg-green-500 text-white hover:bg-green-600 active:bg-green-600 disabled:bg-black/35 disabled:text-white",
};

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();
  if (href !== undefined && href !== "") {
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      href,
      className: classes,
    };
    if (ariaLabel !== undefined && ariaLabel !== "") {
      anchorProps["aria-label"] = ariaLabel;
    }
    return <a {...anchorProps}>{children}</a>;
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
