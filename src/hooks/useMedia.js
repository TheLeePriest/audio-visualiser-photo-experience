import { useEffect, useState } from 'react';

const getStream = async (getAudio, getVideo) => {
    const stream = await navigator.mediaDevices
        .getUserMedia({ audio: getAudio, video: getVideo ? { width: 1280, height: 720 } : false })
        .catch((error) => new Error(error));
    return stream;
};

const useMedia = (getAudio = true, getVideo = true) => {
    const [source, setSource] = useState(null);
    const [audioAnalyser, setAudioAnalyser] = useState(null);
    const [timeData, setTimeData] = useState(null);
    const [frequencyData, setFrequencyData] = useState(null);
    const [bufferLength, setBufferLength] = useState(null);
    const [videoStream, setVideoStream] = useState(null);

    useEffect(() => {
        getStream(getAudio, getVideo).then((stream) => {
            const audioCtx = new AudioContext();
            setAudioAnalyser(audioCtx.createAnalyser());
            setSource(audioCtx.createMediaStreamSource(stream));
            setVideoStream(stream);
        });
    }, []);

    useEffect(() => {
        if (!source) {
            return;
        }

        source.connect(audioAnalyser);
        audioAnalyser.fftSize = 2 ** 10;

        const frequencyBinCountArray = new Uint8Array(audioAnalyser.frequencyBinCount);
        setTimeData(frequencyBinCountArray);
        setFrequencyData(frequencyBinCountArray);
        setBufferLength(audioAnalyser.frequencyBinCount);
    }, [source]);

    return [audioAnalyser, timeData, frequencyData, bufferLength, videoStream];
};

export default useMedia;
