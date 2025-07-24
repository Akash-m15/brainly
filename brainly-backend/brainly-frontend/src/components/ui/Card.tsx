import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: string;
}

export function Card(props: CardProps) {
  return (
    <div>
      <div className="bg-white shadow-md max-w-72 rounded-md min-h-80 outline-2 outline-slate-200 border-gray-400 flex-cols ">
        <div className="flex min-w-full border-b-1 border-slate-200 shadow-md  justify-between py-4  max-h-11 px-2 items-center">
          <div className="flex items-center text-gray-500">
            <ShareIcon size={"md"} />
            <span className="px-4 text-md text-black font-semibold">
             {props.title}
            </span>
          </div>

          <div className="flex">
            <div className="px-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
            <div className="px-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>

        <div className="mt-3 p-1 ">
          {props.type === "youtube" && <iframe  className=" min-h-40 w-full rounded-sm" src={props.link.replace("youtu.be","www.youtube.com/embed").replace("watch?v=","embed/").replace("&","/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {props.type === "twitter" && 
          <blockquote className="twitter-tweet">
            <a href={(props.link.replace("x","twitter"))}></a>
          </blockquote>}
        </div>
      </div>
    </div>
  );
}
//https://youtu.be/Lv8BD8xefJs?si=iRKoYob3Wx1iryYU
//src="https://www.youtube.com/embed/Lv8BD8xefJs?si=iRKoYob3Wx1iryYU" 


//https://x.com/tiagopog/status/807811447862468608

// 'https://twitter.com/tiagopog/status/807811447862468608'