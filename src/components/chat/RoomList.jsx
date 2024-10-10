import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import initialize from "@/config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";

export default function RoomList({ roomId, setRoomId }) {
  const { toast } = useToast();
  const [newRoom, setNewRoom] = useState("");
  const { firestore } = initialize();
  const [rooms, setRooms] = useState([]);
  const collectionRooms = collection(firestore, "rooms");

  useEffect(() => {
    onSnapshot(collectionRooms, (snapshot) => {
      setRooms(
        snapshot.docs.map((s) => {
          return {
            id: s.id,
            ...s.data(),
          };
        }),
      );
    });
  }, []);

  const createRoom = (e) => {
    e.preventDefault(e);

    addDoc(collectionRooms, { name: newRoom }).catch(() =>
      toast({
        title: "Error",
        description: "Failed to create a new room",
        variant: "destructive",
      }),
    );

    setNewRoom("");
  };

  return (
    <>
      <div>
        <Dialog className="z-[1000]">
          <DialogTrigger asChild>
            <Button className="mb-4 w-full">Create Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Room</DialogTitle>
              <DialogDescription>Create a new room</DialogDescription>
            </DialogHeader>
            <div>
              <form onClick={createRoom}>
                <label>Name</label>
                <Input
                  placeholder="Enter the room name"
                  value={newRoom}
                  onChange={(event) => setNewRoom(event.target.value)}
                />
                <div className="flex justify-end">
                  <DialogClose>
                    <Button className="mt-4">Create</Button>
                  </DialogClose>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea>
        <div className="h-[65vh] w-full space-y-4">
          {rooms.map((r) => (
            <Card
              className="cursor-pointer rounded-md"
              key={r.id}
              onClick={() => {
                setRoomId(r.id);
              }}
            >
              <CardHeader>
                <CardTitle>{r.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
