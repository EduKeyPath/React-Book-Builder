import React, {useState, useEffect} from "react";
import { useWhisper } from '@chengsokdara/use-whisper';
import './audio-to-text.css';

export default function AudioToText(props:any){ 
    const {
        recording,
        speaking,
        transcribing,
        transcript,
        pauseRecording,
        startRecording,
        stopRecording,
      } = useWhisper({
        apiKey: ' ', // YOUR_OPEN_AI_TOKEN
    })

    useEffect(() => {
        props.insertAudioContent(transcript.text);
    }, [transcript.text]);
    
    // console.log(recording, 'recording', speaking, 'speaking', transcribing, 'transcribing',transcript.text, 'transcript.text');

    return(
        <>
            <div className="row audio-converter">
                <div className="col-6">
                    <h3 className="hdng">Recording</h3>
                    <div className="audio-box">
                        <div className="audio-row">
                            <div className="button-row">
                                <button type="button" className="ds-btn ds-btn--tertiary ds-btn-icon" onClick={() => startRecording()}>
                                    <span className="material-icons ds-btn__icon" aria-hidden="true">play_arrow</span>
                                </button>
                                <button type="button" className="ds-btn ds-btn--tertiary ds-btn-icon mx-2" onClick={() => pauseRecording()}>
                                    <span className="material-icons ds-btn__icon" aria-hidden="true">pause</span>
                                </button>
                                <button type="button" className="ds-btn ds-btn--tertiary ds-btn-icon" onClick={() => stopRecording()}>
                                    <span className="material-icons ds-btn__icon" aria-hidden="true">stop</span>
                                </button>
                            </div>
                        </div>
                        <div className="audio-row">
                            <div className="left-part">
                                <p>Recording:</p>
                            </div>
                            <div className="right-part">
                                {
                                    !!recording ? 
                                    <div className="recording-box-container">
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                        <div className="record-stripe"></div>
                                    </div>
                                    : null
                                }                                
                            </div>
                        </div>
                        <div className="audio-row">
                            <div className="left-part">
                                <p>Speaking:</p>
                            </div>
                            <div className="right-part">
                                {
                                    !!speaking ? 
                                    <div className="speaking-box-container">
                                        <div className="speaking speaking1"></div>
                                        <div className="speaking speaking2"></div>
                                        <div className="speaking speaking3"></div>
                                        <div className="speaking speaking4"></div>
                                        <div className="speaking speaking5"></div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="audio-row">
                            <div className="left-part">
                                <p>Transcribing:</p>
                            </div>
                            <div className="right-part">
                                {
                                    !!transcribing ? 
                                    <div className="translate-box-container">
                                        <div className="translate-wave"></div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="converted-content-body pt-1">
                        <h3 className="hdng">Content</h3>
                        <div className="content-box">
                            {
                                !!transcript.text ?
                                <p>{transcript.text}</p>
                                : 
                                <div className="content-box-icon">
                                    <span className="material-icons-outlined content-icon">description</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <p>Transcribing: {transcribing}</p> */}
            {/* <p>Transcribed Text: {transcript.text}</p> */}
            {/* <button onClick={() => startRecording()}>Start</button>
            <button onClick={() => pauseRecording()}>Pause</button>
            <button onClick={() => stopRecording()}>Stop</button> */}
        </>
    )
}