import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect } from "react"




export  function UseContent({contents,setContents}:any) {

  

  async function refreshContents()
  {
    const res = await axios.get(`${BACKEND_URL}/api/v1/content`,{
      headers:{
        "Authorization" : localStorage.getItem("token")
    }
  })
  console.log(res.data.content)
  setContents(res.data.content)
  }


  useEffect(function()
  {
    refreshContents()
  },[])
  return {contents , refreshContents}
}
