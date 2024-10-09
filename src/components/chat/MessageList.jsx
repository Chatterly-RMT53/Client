import initialize from "@/config/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import useAuth from "@/hooks/useAuth";

const MessageList = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { firestore } = initialize();
  const { user } = useAuth();
  useEffect(() => {
    onSnapshot(
      collection(firestore, `rooms/${roomId}/messages`),
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
  };

  return (
    <div className="flex min-h-[65vh] flex-col justify-between">
      <div className="space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-md flex p-4 ${m.uid == user.uid && "justify-end"}`}
          >
            <div className={`${m.uid == user.uid && "text-right"} `}>
              <strong>{m.name}</strong>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Separator orientation="horizontal" />
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
                setNewMessage("");
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
