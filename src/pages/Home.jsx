import Logout from "@/components/button/Logout";
import MessageList from "@/components/chat/MessageList";
import RoomList from "@/components/chat/RoomList";
import Navbar from "@/components/navbar/navbar";
import {Card} from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    console.log(roomId)
  })
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex gap-x-10">
          <div className="flex-1 max-w-[350px]">
            <RoomList roomId={roomId} setRoomId={setRoomId}/>
          </div>
          <div className="flex-1 flex">
            <Separator orientation="vertical" className="mr-8"/>
            <div className="flex-1">
              {roomId && 
            <MessageList roomId={roomId} />
              }
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
