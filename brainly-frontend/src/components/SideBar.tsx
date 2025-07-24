import Logo from "../icons/Logo";
import TwitterIcon from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import SideBarItem from "./ui/SideBarItem";

export default function SideBar() {
  return (
    <div className="h-screen fixed top-0 left-0 min-w-72 bg-white outline-2 outline-slate-200 ">
      <div className=" p-4 flex text-purple-600 items-center ">
        <Logo />
        <div className="pl-6 text-2xl font-mono font-bold">
        Brainly
          </div>
      </div>
      <div className="mt-4 transition-all ">
      <SideBarItem title="Twitter" icon={<TwitterIcon />} />
      <SideBarItem title="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  )
}



