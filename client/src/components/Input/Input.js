import React from 'react';

import paper_clip from '../../icons/paper_clip.png';

import './Input.css';

const Input = ({ setMessage, sendMessage, message,}) => (
  <form className="form">
    <label for="fileSelector">
    <img alt="Upload" src={paper_clip}/>
    </label>
    <input id="fileSelector" type="file" className="fileInput" />
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;