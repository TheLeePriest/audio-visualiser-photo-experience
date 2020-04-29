import React, { useEffect, useRef, useContext } from 'react';
import { store } from './store/store';
import { hslToRgb } from './modules/helpers';

const App = () => {
    const { state, dispatch } = useContext(store);
    const {
        defaultCanvasWidth,
        defaultCanvasHeight,
        audioCanvasCtx,
        bufferLength,
        timeData,
        frequencyData,
    } = state;
    const audioVisualiserCanvasRef = useRef(null);
    const audioAnalyser = useRef(null);

    function drawTimeData() {
        audioAnalyser.current.getByteTimeDomainData(timeData);
        audioCanvasCtx.clearRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);
        audioCanvasCtx.lineWidth = 12;
        audioCanvasCtx.strokeStyle = '#000000';
        audioCanvasCtx.beginPath();
        const sliceWidth = defaultCanvasWidth / bufferLength;

        let x = 0;
        timeData.forEach((data, i) => {
            const v = data / 128;
            const y = (v * defaultCanvasHeight) / 2;
            if (i === 0) {
                audioCanvasCtx.moveTo(x, y);
            } else {
                audioCanvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        });

        audioCanvasCtx.stroke();

        requestAnimationFrame(() => drawTimeData(timeData));
    }

    function drawFrequency() {
        audioAnalyser.current.getByteFrequencyData(frequencyData);
        const barWidth = (defaultCanvasWidth / bufferLength) * 2.5;
        let x = 0;
        frequencyData.forEach((amount) => {
            const percent = amount / 255;
            const [h, s, l] = [360 / (percent * 360) - 0.5, 1, 0.5];
            const [r, g, b] = hslToRgb(h, s, l);
            const barHeight = (defaultCanvasHeight * percent) / 2;
            audioCanvasCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            audioCanvasCtx.fillRect(x, defaultCanvasHeight - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        });

        requestAnimationFrame(() => drawFrequency(frequencyData));
    }


    useEffect(() => {
        audioVisualiserCanvasRef.current.width = defaultCanvasWidth;
        audioVisualiserCanvasRef.current.height = defaultCanvasHeight;
        dispatch({ type: 'setAudioCanvasCtx', payload: audioVisualiserCanvasRef.current.getContext('2d') });
    }, []);


    useEffect(() => {
        if (!audioCanvasCtx) {
            return;
        }

        const getStream = async () => {
            const stream = await navigator.mediaDevices
                .getUserMedia({ audio: true })
                // eslint-disable-next-line no-console
                .catch((error) => console.log(error));
            return stream;
        };

        getStream().then((stream) => {
            const audioCtx = new AudioContext();
            audioAnalyser.current = audioCtx.createAnalyser();

            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(audioAnalyser.current);
            audioAnalyser.current.fftSize = 2 ** 10;

            const frequencyBinCountArray = new Uint8Array(audioAnalyser.current.frequencyBinCount);
            dispatch({
                type: 'setStreamData',
                payload: {
                    timeData: frequencyBinCountArray,
                    frequencyData: frequencyBinCountArray,
                    bufferLength: audioAnalyser.current.frequencyBinCount,
                },
            });
        });
    }, [audioCanvasCtx]);

    useEffect(() => {
        if (!timeData || !audioCanvasCtx) {
            return;
        }

        drawTimeData(timeData);
        drawFrequency(frequencyData);
    }, [timeData, audioCanvasCtx]);

    return (
        <div>
            <canvas ref={audioVisualiserCanvasRef} />
        </div>
    );
};

export default App;
