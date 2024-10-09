import initialize from "@/config/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import useAuth from "@/hooks/useAuth";
import { ScrollArea } from "../ui/scroll-area";
import { formatFirebaseTimestamp } from "@/lib/utils";
import { Card } from "../ui/card";
import { SendIcon } from "lucide-react";

const MessageList = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { firestore } = initialize();
  const { user } = useAuth();
  useEffect(() => {
    onSnapshot(
      query(
        collection(firestore, `rooms/${roomId}/messages`),
        orderBy("createdAt", "asc"),
      ),
      (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      },
    );
  }, [roomId]);

  const sendMessage = async () => {
    await addDoc(collection(firestore, `rooms/${roomId}/messages`), {
      uid: user.uid,
      text: newMessage,
      name:
        user.providerData[0]?.displayName ||
        `anonymous-${user.uid.slice(0, 5)}`,
      createdAt: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col justify-between">
      <ScrollArea className="h-[60vh]">
        <div className="">
          {messages.map((m, i) => (
            // <div
            //   key={i}
            //   className={`text-md flex p-4 ${m.uid == user.uid && "justify-end"}`}
            // >
            //   <div>

            //   <strong>{m.name}</strong>
            //   <div>
            //     <Card className="mt-4 rounded-sm p-2">
            //       <p className={`${m.uid == user.uid && "text-right"} min-w-0`}>
            //         {m.text}
            //       </p>
            //     </Card>
            //   </div>
            //   </div>
            // </div>
            <div
              key={i}
              className={`flex p-4 ${m.uid == user.uid && "justify-end"}`}
            >
              <div
                className={`flex flex-col ${m.uid == user.uid && "items-end"} `}
              >
                <strong>{m.name}</strong>
                <Card className="mt-2 min-w-fit max-w-max rounded-sm p-2">
                  <p className="min-w-0">{m.text}</p>
                </Card>
                <p className="ml-2 mt-4 text-xs text-slate-500">
                  {formatFirebaseTimestamp(m.createdAt?.seconds)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div>
        {/* <Separator orientation="horizontal" /> */}
        <div className="mt-8">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message"
          />
          <div className="flex justify-end">
            <Button
              className="mt-4"
              onClick={() => {
                sendMessage();
              }}
            >
              <div className="flex items-center space-x-2">
                <span>Send</span>
                <SendIcon />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
