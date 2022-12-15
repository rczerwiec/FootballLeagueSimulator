import className from "classnames";

function Input({placeholder, value, onChange}) {


    const classes = className("p-2 m- bg-slate-300 rounded")

    return(
        <input placeholder={placeholder} className={classes} value={value} onChange={onChange}></input>

    )
}

Input.defaultProps = {
    placeholder: "Wpisz coś..."
}

export default Input