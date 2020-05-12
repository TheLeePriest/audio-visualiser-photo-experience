import { useEffect, useRef, useContext } from 'react';
import { store } from '../../store/store';
import { hslToRgb } from '../../modules/helpers';

const AudioVisualiser = () => {
    const { state, dispatch } = useContext(store);
    const {
        defaultCanvasWidth,
        defaultCanvasHeight,
        audioCanvasCtx,
        bufferLength,
        timeData,
        frequencyData,
        audioAnalyser,
    } = state;
    const audioVisualiserCanvasRef = useRef(null);

    useEffect(() => {
        audioVisualiserCanvasRef.current = document.createElement('canvas');
        audioVisualiserCanvasRef.current.width = defaultCanvasWidth;
        audioVisualiserCanvasRef.current.height = defaultCanvasHeight;
        dispatch({ type: 'setAudioCanvasCtx', payload: audioVisualiserCanvasRef.current.getContext('2d') });
        dispatch({ type: 'setAudioCanvas', payload: audioVisualiserCanvasRef.current });
    }, []);

    // function drawTimeData() {
    //     audioAnalyser.getByteTimeDomainData(timeData);
    //     audioCanvasCtx.clearRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);
    //     audioCanvasCtx.lineWidth = 12;
    //     audioCanvasCtx.strokeStyle = '#000000';
    //     audioCanvasCtx.beginPath();
    //     const sliceWidth = defaultCanvasWidth / bufferLength;
    //
    //     let x = 0;
    //     timeData.forEach((data, i) => {
    //         const v = data / 128;
    //         const y = (v * defaultCanvasHeight) / 2;
    //         if (i === 0) {
    //             audioCanvasCtx.moveTo(x, y);
    //         } else {
    //             audioCanvasCtx.lineTo(x, y);
    //         }
    //
    //         x += sliceWidth;
    //     });
    //
    //     audioCanvasCtx.stroke();
    //
    //     requestAnimationFrame(() => drawTimeData(timeData));
    // }

    function drawFrequency() {
        audioCanvasCtx.clearRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);
        audioAnalyser.getByteFrequencyData(frequencyData);
        const barWidth = (defaultCanvasWidth / bufferLength) * 3.5;
        let x = 0;
        frequencyData.forEach((amount) => {
            const percent = amount / 255;
            const [h, s, l] = [180 / (percent * 180) - 0.5, 2, 0.5];
            const [r, g, b] = hslToRgb(h, s, l);
            const barHeight = (defaultCanvasHeight * percent) / 1.5;

            audioCanvasCtx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
            audioCanvasCtx.fillRect(x, defaultCanvasHeight - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        });

        requestAnimationFrame(() => drawFrequency(frequencyData));
    }

    useEffect(() => {
        if (!timeData || !audioCanvasCtx) {
            return;
        }

        // drawTimeData(timeData);
        drawFrequency(frequencyData);
    }, [timeData, audioCanvasCtx]);

    return null;
};

export default AudioVisualiser;
