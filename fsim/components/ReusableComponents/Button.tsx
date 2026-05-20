import className from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  rounded?: boolean;
  unclickable?: boolean;
  border?: boolean;
  fontxl?: boolean;
}

function Button({
  children,
  primary,
  secondary,
  rounded,
  unclickable,
  border,
  fontxl,
  ...rest
}: ButtonProps) {
  const classes = className("m-1.5 p-4 items-center", {
    "bg-emerald-500 hover:bg-gray-400": primary,
    "bg-slate-400 hover:bg-slate-300 p-3": secondary,
    "rounded-full ": rounded,
    "border border-black": border,
    "text-2xl": fontxl,
    "bg-emerald-800": unclickable,
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
