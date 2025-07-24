import { ReactElement } from "react";

interface SideBarItemProps {
  title: string;
  icon: ReactElement;
}

export default function SideBarItem({ title, icon }: SideBarItemProps) {
  return (
    <div className=" ml-8 flex px-4 py-2 max-w-48 hover:bg-slate-400 rounded-lg">
      <div className="pr-3">{icon}</div>
      <div className="text-gray-600 text-md font-mono">{title}</div>
    </div>
  );
}
