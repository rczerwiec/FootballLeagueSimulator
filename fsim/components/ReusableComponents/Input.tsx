import classNames from "classnames";
import type { ChangeEventHandler, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  type?: string;
}

function Input({
  placeholder = "Wpisz coś...",
  value,
  onChange,
  className,
  type,
  ...rest
}: InputProps) {
  const classes = classNames("p-2 m- bg-slate-300 rounded", className);

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classes}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
