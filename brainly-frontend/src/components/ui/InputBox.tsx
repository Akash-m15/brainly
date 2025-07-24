
export  function InputBox(props:any) {
  return (
    <div>
      <input type={props.type} placeholder={props.placeholder}  ref={props.ref}  className="px-6 py-3  hover:bg-gray-100 placeholder:text-bold placeholder:font-mono focus: border m-2 rounded-md"/>
    </div>
  )
}
