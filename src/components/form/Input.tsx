import { forwardRef } from "react";


const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <label className="block">
      {props.title && <span className="text-gray-700">{props.title}</span>}
      <input 
        type={props.type}
        className={props.className ? props.className : "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
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
