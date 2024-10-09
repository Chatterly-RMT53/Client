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
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/useToast";

export default function RoomList({ roomId, setRoomId }) {
  const { toast } = useToast();
  const { firestore } = initialize();
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");
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

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4 w-full">Create Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Room</DialogTitle>
              <DialogDescription>Create a new room</DialogDescription>
            </DialogHeader>
            <div>
              <label>Name</label>
              <Input
                placeholder="Enter the room name"
                value={newRoom}
                onChange={(event) => setNewRoom(event.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  className="mt-4"
                  onClick={() => {
                    addDoc(collectionRooms, { name: newRoom }).catch((e) =>
                      toast({
                        title: "Error",
                        description: "Failed to create a new room",
                        variant: "destructive",
                      }),
                    );
                  }}
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full space-y-4">
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
    </>
  );
}
