import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import initialize from "@/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function RoomList({roomId, setRoomId}) {
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

  return (
    <>
    <div className="space-y-4 w-full">
      {rooms.map((r) => (
        <Card onClick={()=>{setRoomId(r.id)}}>
          <CardHeader>
            <CardTitle>{r.name}</CardTitle>
            {/* <CardDescription>{r.createdAt}</CardDescription> */}
          </CardHeader>
        </Card>
      ))}
      </div>
    </>
  );
}
