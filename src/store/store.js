import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const store = createContext({});
const { Provider } = store;


const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        (reducerState, { type, payload }) => {
            switch (type) {
            case 'setPayload':
                return {
                    ...reducerState,
                    payload,
                };
            case 'setAnalyser':
                return {
                    ...reducerState,
                    audioAnalyser: payload,
                };
            case 'setBufferLength':
                return {
                    ...reducerState,
                    bufferLength: payload,
                };
            case 'setAudioCanvasCtx':
                return {
                    ...reducerState,
                    audioCanvasCtx: payload,
                };
            case 'setTimeData':
                return {
                    ...reducerState,
                    timeData: payload,
                };
            case 'setFrequencyData':
                return {
                    ...reducerState,
                    frequencyData: payload,
                };
            case 'setStreamData':
                return {
                    ...reducerState,
                    ...payload,
                };
            case 'setAudioCanvas':
                return {
                    ...reducerState,
                    audioCanvas: payload,
                };
            case 'setVideoCanvas':
                return {
                    ...reducerState,
                    videoCanvas: payload,
                };
            case 'setVideoCanvasCtx':
                return {
                    ...reducerState,
                    videoCanvasCtx: payload,
                };
            case 'setVideoCanvasWithCtx':
                return {
                    ...reducerState,
                    videoCanvas: payload.videoCanvas,
                    videoCanvasCtx: payload.videoCanvasCtx,
                };
            case 'setMainCanvasWithCtx':
                return {
                    ...reducerState,
                    mainCanvas: payload.mainCanvas,
                    mainCanvasCtx: payload.mainCanvasCtx,
                };
            case 'reset':
                return {};
            default:
                return state;
            }
        },
        {
            defaultCanvasWidth: 1920,
            defaultCanvasHeight: 1080,
            audioAnalyser: null,
            audioCanvasCtx: null,
            audioCanvas: null,
            videoStream: null,
            videoCanvas: null,
            videoCanvasCtx: null,
            aspectRatio: 9 / 16,
            theme: 'darkTheme',
        },
    );

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

StateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { store, StateProvider };
