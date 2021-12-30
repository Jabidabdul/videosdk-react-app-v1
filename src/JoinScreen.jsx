import React, { useEffect, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { getToken, validateMeeting, createMeeting } from "./api";
import App from "./App";

export default function JoinScreen(props) {
    return(
        <div>
      <input type="text" placeholder="Enter Meeting Id" onChange={(e) => {props.setMeetingId(e.target.value)}}  />
      <button  onClick={props.getMeetingAndToken}>
        Join
      </button>
      <button  onClick={props.getMeetingAndToken}>
        Create Meeting
      </button>
    </div>
    )
    
  }