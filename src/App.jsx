import React, { useEffect, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { getToken, validateMeeting, createMeeting } from "./api";
import JoinScreen from "./JoinScreen";
import MeetingGrid from './MeetingGrid';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import ParticipantView from "./ParticipantView";

function App() {
  
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async () => {
    console.log('token')
    const token = await getToken();
    const meetingId = await createMeeting({ token });

    setToken(token);
    setMeetingId(meetingId);
  };
  

  useEffect(getMeetingAndToken, []);
  return token && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: false,
        name: "Participant Name",
      }}
      token={token}
    >
      <MeetingConsumer>
        {() => <MeetingGrid meetingId={meetingId}/>}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen
    setMeetingId={setMeetingId}
    getMeetingAndToken={getMeetingAndToken} 
    />
  );
}

export default App;