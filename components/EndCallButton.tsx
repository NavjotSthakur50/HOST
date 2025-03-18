"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import { Button } from './ui/button';
import { redirect, useRouter } from 'next/navigation';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter;
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === 
  call.state.createdBy.id;
  
  if(!isMeetingOwner) return null;
    const endCall = async () => {
        await call.endCall();
        redirect('/');
    }
    return (
    <Button onClick={endCall} className="bg-red-500">
        End Call for EveryOne
    </Button>
  )
}

export default EndCallButton