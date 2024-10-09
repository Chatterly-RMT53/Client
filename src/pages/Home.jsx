import MessageList from "@/components/chat/MessageList";
import RoomList from "@/components/chat/RoomList";
import Navbar from "@/components/navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <Navbar hamburgerAction={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="container">
        <div className="flex gap-x-10">
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 w-full flex-1 flex-col bg-white md:relative md:block md:max-w-[300px] ${isMenuOpen ? "flex" : "hidden"}`}
          >
            <Navbar
              className="md:hidden"
              hamburgerAction={() => setIsMenuOpen(!isMenuOpen)}
            />
            <div className="p-4 md:px-0">
              <RoomList roomId={roomId} setRoomId={setRoomId} />
            </div>
          </div>
          <div className="flex flex-1">
            <Separator
              orientation="vertical"
              className="mr-8 hidden md:block"
            />
            <div className="min-h-[65vh] flex-1">
              {roomId && <MessageList roomId={roomId} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
