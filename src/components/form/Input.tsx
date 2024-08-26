import { forwardRef } from "react";


const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <label className="block">
      {props.title && <span className="text-gray-700">{props.title}</span>}
      <input 
        type={props.type}
        className={props.className}
        id={props.name}
        name={props.name}
        ref={ref}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        value={props.value}
      />
    </label>
  )
})

export default Input;
