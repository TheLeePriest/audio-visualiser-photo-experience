import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import AudioVisualiser from './components/AudioVisualiser/AudioVisualiser';
import VideoHandler from './components/VideoHandler/VideoHandler';
import useMedia from './hooks/useMedia';
import { store } from './store/store';
import MainCanvas from './components/MainCanvas/MainCanvas';
import * as themes from './styled/theme';
import GlobalStyles from './globalStyles';


const App = () => {
    const { dispatch, state } = useContext(store);
    const { theme } = state;
    const [audioAnalyser, timeData, frequencyData, bufferLength, videoStream] = useMedia();

    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';

        const clickHandler = () => {
            setTimeout(() => {
                URL.revokeObjectURL(url);
                a.removeEventListener('click', clickHandler);
            }, 150);
        };

        a.addEventListener('click', clickHandler, false);
        a.click();
        return a;
    }

    useEffect(() => {
        if (![audioAnalyser, timeData, frequencyData, bufferLength].every((item) => item)) {
            // console.log('one of them is null!');
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

    const takePhoto = () => {
        state.mainCanvas.toBlob((blob) => {
            downloadBlob(blob);
        });
    };

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyles />
            <AudioVisualiser />
            <VideoHandler />
            <MainCanvas />
            <button onClick={() => takePhoto()} type="button">Take photo!</button>
        </ThemeProvider>
    );
};

export default App;
