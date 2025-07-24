import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./ui/Button";
import { InputBox } from "./ui/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { UseContent } from "./UseContent";



interface ModalProps {
  modalOpen : boolean,
  setModalOpen : any,
  refreshContents:()=>void
}
enum ContentType  {
  Youtube = "youtube",
  Twitter ="twitter"
}


export function CreateContentModal({modalOpen,setModalOpen,refreshContents}:ModalProps) {

  const [contentType , setContentType] = useState(ContentType.Youtube)

  

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  

  async function addContent()
  {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

  const res = await axios.post(`${BACKEND_URL}/api/v1/content`,{
      title,
      link,
      type:contentType
    },
    {
      headers : {
        "Authorization" : localStorage.getItem("token")
      }
    })
    
    alert("Content Added")
    refreshContents()

    setModalOpen(false)
  }
  return (
    <div>
      {modalOpen && (
        <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center z-10">
          <div className=" flex flex-col justify-center">
            <span className="bg-white opacity-100 rounded-xl p-4 py-6">
              <div className="flex justify-end pb-4" onClick={()=>setModalOpen(false)}>
              <CloseIcon size="lg" />
              </div>
              <div className="px-10">
                <InputBox ref={titleRef} placeholder={"Title"}/>
                <InputBox  ref={linkRef} placeholder={"Link"}/>
              </div> 
              <div className="flex gap-2 justify-center p-2 transition-all">
                
                <Button variant={contentType === "youtube"?"secondary":"dummy"} text="Youtube" size="md" onClick={()=>setContentType(ContentType.Youtube)} />
                <Button variant={contentType === "twitter"?"secondary":"dummy"} text="Twitter" size="md" onClick={()=>setContentType(ContentType.Twitter)} /> 
              </div>
              
              <div className="flex justify-center mt-3">
                  <Button size="md" variant="primary" text="Submit" onClick={addContent}/>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
