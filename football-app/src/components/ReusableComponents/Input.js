import classNames from "classnames";

function Input({placeholder, value, onChange, className,type}) {


    const classes = classNames("p-2 m- bg-slate-300 rounded",className)

    return(
        <input type={type} placeholder={placeholder} className={classes} value={value} onChange={onChange}></input>

    )
}

Input.defaultProps = {
    placeholder: "Wpisz coś..."
}

export default Input