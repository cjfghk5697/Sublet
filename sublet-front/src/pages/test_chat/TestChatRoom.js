import { useParams } from "react-router"
import { testStore } from "./TestChat.js";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const TestChatRoom = () => {
  const { user, setUser, login, register, logOut, printUser, posts, getPostsFromBackend, sendPost, setPost, rooms, setRooms, socket, setSocket } = testStore(
    ({ user, setUser, login, register, logOut, printUser, posts, getPostsFromBackend, sendPost, setPost, rooms, setRooms, socket, setSocket }) =>
      ({ user, setUser, login, register, logOut, printUser, posts, getPostsFromBackend, sendPost, setPost, rooms, setRooms, socket, setSocket })
  );

  const [chatLog, setChatLog] = useState([]);
  const addMessage = (userid, message) => {
    const messageList = document.querySelector("ul.messageUl");
    const messageLi = document.createElement("li");
    messageLi.innerText = `${userid}: ${message}`;
    messageList.appendChild(messageLi);
  }

  const params = useParams();
  console.log(params);

  const onReceiveMessage = (chatlog) => {
    console.log("receive message from server,", chatlog);
    console.log(chatLog);
    console.log([...chatLog, chatlog]);
    setChatLog([...chatLog, chatlog]);
  }

  useEffect(() => {
    if (!socket)
      setSocket(io("http://localhost:4000"));
    else {
      socket.emit("get_chatlog", params.chatId, (ret) => {
        console.log("get chatlog responded!");
        console.log(ret);
        setChatLog(ret);
      })
    }
  }, [socket]);

  if (socket) {
    socket.on("receive_message", onReceiveMessage);
    socket.on("delete_message", (chat_id) => {
      setChatLog(chatLog.filter((chat) => chat.id !== chat_id));
    })
  }

  useEffect(() => {
    if (!user?.id)
      setUser();
  }, [socket, user]);

  useEffect(() => {
    if (socket && user?.id) {
      socket.emit("login", user.id, (rooms) => { console.log("after login, socket has rooms", rooms); });
    }
  }, [socket, user])

  console.log("chatLog:", chatLog);
  return <div><ul className="messageUl"></ul>

    <ul>
      {
        chatLog ? chatLog.map((chat, index) => {
          return <li key={index}>{`${chat.user.user_id}: ${chat.message}`} <button onClick={() => {
            socket.emit("delete_message", chat.id)
          }}> Delete </button></li>
        }) : <li>No ChatLog</li>
      }
    </ul>

    <form onSubmit={(e) => {
      e.preventDefault();
      const input = document.querySelector(".submit-text-input");
      socket.emit("send_message", { user_id: user.id, user_custom_id: user.user_id, message: input.value, room_id: params.chatId })
      input.value = "";
    }}><input type="text" placeholder="Type text" className="submit-text-input"></input> <button type="submit"> Submit!</button></form></div>;
}

export default TestChatRoom;