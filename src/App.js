import React, { useContext, useEffect } from 'react';
import AudioVisualiser from './components/AudioVisualiser/AudioVisualiser';
import VideoHandler from './components/VideoHandler/VideoHandler';
import useMedia from './hooks/useMedia';
import { store } from './store/store';
import MainCanvas from './components/MainCanvas/MainCanvas';


const App = () => {
    const { dispatch } = useContext(store);
    const [audioAnalyser, timeData, frequencyData, bufferLength, videoStream] = useMedia();

    useEffect(() => {
        if (![audioAnalyser, timeData, frequencyData, bufferLength].every((item) => item)) {
            console.log('one of them is null!');
            return;
        }

        dispatch({
            type: 'setStreamData',
            payload: {
                timeData,
                frequencyData,
                bufferLength,
                audioAnalyser,
                videoStream,
            },
        });
    }, [audioAnalyser, timeData, frequencyData, bufferLength, videoStream]);

    return (
        <div>
            <AudioVisualiser />
            <VideoHandler />
            <MainCanvas />
        </div>
    );
};

export default App;
