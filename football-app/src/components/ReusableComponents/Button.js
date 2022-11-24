import className from "classnames";

function Button({
  children,
  primary,
  secondary,
  rounded,
  border,
  fontxl,
  ...rest
}) {
  const classes = className("m-1.5 p-4 items-center", {
    "bg-emerald-500 hover:bg-gray-400": primary,
    "bg-slate-400 hover:bg-slate-300 p-3": secondary,
    "rounded-full ": rounded,
    "border border-black": border,
    "text-2xl": fontxl
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariation: ({ primary, secondary }) => {
    const count = Number(!!primary) + Number(!!secondary);
    if (count > 1) {
      return new Error(
        "You can't have both primary and secondary on true value"
      );
    }
  },
};

export default Button;
