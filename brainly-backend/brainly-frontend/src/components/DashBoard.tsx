



import { Button } from "./ui/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "./ui/Card";

import { useState } from "react";
import { CreateContentModal } from "./CreateContentModal";
import SideBar from "./SideBar";
import { UseContent } from "./UseContent";
  
  export default function DashBoard() {
  const[modalOpen,setModalOpen] = useState(false);
  const [contents , setContents] = useState<any[]>([]);
  const {refreshContents} = UseContent({contents,setContents});
  return (
    <div className="flex">
    <div>
      <SideBar />
    </div>

    <div className="p-4 w-full ml-72">
    <div className="flex justify-end gap-4">
      
    
      <Button
        variant={"primary"}
        text={"   Add Button"}
        size={"lg"}
        onClick={() =>{setModalOpen(true)}}
        startIcon={<PlusIcon size={"md"} />}
      />
      <Button
        variant={"secondary"}
        text={"Share Brain"}
        size={"lg"}
        onClick={() => alert("Clicked")}
        startIcon={<ShareIcon size={"md"} />}
      />
    </div>  
    <div className="flex gap-4 mt-8 flex-wrap">
      {contents.map((content,i)=>
        <Card key={i} link={content.link} type={content.type} title={content.title}/>
      )
      }
      
      </div>
      <CreateContentModal modalOpen={modalOpen} setModalOpen={setModalOpen} refreshContents={refreshContents}/>
    </div>
    </div>
    
  )
}
