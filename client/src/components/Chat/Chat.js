import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //const ENDPOINT = 'localhost:5000';
  const ENDPOINT = 'https://appchat-hk.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    
    var selector 	= document.getElementById("fileSelector");
      var empty = document.getElementById("fileSelector").value;
      if(selector.files.length == 0){
      socket.emit('sendMessage', message, {base64:empty}, () => setMessage(''));
      }
      else{
      var reader = new FileReader();
            reader.onload = function (e) {
                  console.log(e.target.result);
                  socket.emit('sendMessage', message, {base64:e.target.result}, () => setMessage(''));
            }
            reader.readAsDataURL(selector.files[0]);
            document.getElementById("fileSelector").value = "";
          }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  );
}
export default Chat;
