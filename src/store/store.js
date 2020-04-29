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
            case 'reset':
                return {};
            default:
                return state;
            }
        },
        {
            defaultCanvasWidth: 1280,
            defaultCanvasHeight: 720,
            audioAnalyser: null,
            audioCanvasCtx: null,
        },
    );

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

StateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { store, StateProvider };
