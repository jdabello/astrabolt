import React from 'react';
import { Button, Container } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MicFill, StopCircleFill } from 'react-bootstrap-icons';

export function Dictaphone({transcriptOutput}) {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    function handleClick() {
        if (listening) {
            SpeechRecognition.stopListening();
            console.log(transcript);
            transcriptOutput(transcript);
        } else {
            resetTranscript();
            SpeechRecognition.startListening();
        }
    }

    return (
        <Button variant="outline-success" className="border border-left-0" type="button" onClick={handleClick}>
            {listening ? <StopCircleFill size={16} /> : <MicFill size={16} />}
        </Button>
    );
}