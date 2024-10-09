import Logout from "@/components/button/Logout";
import RoomList from "@/components/chat/RoomList";
import Navbar from "@/components/navbar/navbar";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex">
          <div className="flex-1 max-w-[350px]">
          <RoomList roomId={roomId} setRoomId={setRoomId}/>
          </div>
        </div>
      </div>
    </>
  );
}
