import React, { useEffect, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { getToken, validateMeeting, createMeeting } from "./api";
import ParticipantView from "./ParticipantView";
import App from "./App";

const chunk = (arr) => {
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 3));
    return newArr;
  };
  
 export default function MeetingGrid(props) {
    const [joined, setJoined] = useState(false)
    const {
      join, 
      leave,  
      toggleMic,
      toggleWebcam,
      toggleScreenShare
    } = useMeeting()
    const { participants } = useMeeting();
    const joinMeeting = () => {
      setJoined(true)
      join()
    }
    return (
      <div>
        <header>Meeting Id: {props.meetingId}</header>
        {joined ? 
        (
          <div >
            <button  onClick={leave}>
              Leave
            </button>
            <button  onClick={toggleMic}>
              toggleMic
            </button>
            <button  onClick={toggleWebcam}>
              toggleWebcam
            </button>
            <button  onClick={toggleScreenShare}>
              toggleScreenShare
            </button> 
          </div>
        ) 
        : (<button  onClick={joinMeeting}>
          Join
        </button>)}
        <div
          className="wrapper"
        >
          {chunk([...participants.keys()]).map((k) => (
            <div className="box" key={k} style={{ display: "flex" }}>
              {k.map((l) => (
                <ParticipantView key={l} participantId={l} />
              ))}
            </div>
          ))}
        </div>
  
      </div>
    )
  }