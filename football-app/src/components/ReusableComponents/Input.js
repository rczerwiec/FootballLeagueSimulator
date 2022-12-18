import classNames from "classnames";

function Input({placeholder,number, value, onChange, className}) {


    const classes = classNames("p-2 m- bg-slate-300 rounded",className)

    let inputType = number ? "number" : "text";
    //console.log(inputType)

    return(
        <input placeholder={placeholder} type={inputType} className={classes} value={value} onChange={onChange}></input>
    )
}

Input.defaultProps = {
    placeholder: "Wpisz coś...",
}

export default Input;