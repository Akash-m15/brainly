import { ReactElement } from "react"

interface ButtonProps {
  variant : "primary" | "secondary" | "dummy",
  text : string,
  onClick? : () => void
  startIcon? : ReactElement;
  endIcon? : ReactElement
  size : "lg" | "md" | "sm",
  loading? : boolean
}

const variantStyles = {
  "primary" : "bg-purple-600 text-gray-200",
  "secondary" : "bg-purple-300 text-purple-700",
  "dummy" : "bg-purple-200 text-white"
}

const sizeStyles = {
  "lg" : "px-6 py-2 text-md max-w-40 w-full" ,
  "md" : "px-5 py-2 text-md rounded-lg font-mono" ,
  "sm" : "px-2 py-1 text-sm",
}
 
const defaultStyles = "rounded-md flex items-center cursor-pointer "



export function Button(props: ButtonProps)
{
  return (
    <button className={`${defaultStyles} ${variantStyles[props.variant]} ${sizeStyles[props.size]}   disabled=${props.loading} ${props.loading ? "opacity-40" :""} `} onClick={props.onClick}>
     <span className="pr-1">
      {props.startIcon}
      </span> 
      <span className="pb--0.5">
     {props.text}

      </span>
    </button>
  )
}