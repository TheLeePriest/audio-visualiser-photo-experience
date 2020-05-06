import {
    useContext, useEffect, useRef, useCallback,
} from 'react';
import { store } from '../../store/store';

const VideoHandler = () => {
    const videoRef = useRef(null);
    const videoCanvasRef = useRef(null);
    const { state, dispatch } = useContext(store);
    const { videoCanvasCtx } = state;
    const { videoStream, defaultCanvasWidth, defaultCanvasHeight } = state;

    const drawToCanvas = useCallback(() => {
        videoCanvasCtx.clearRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);
        videoCanvasCtx.drawImage(videoRef.current, 0, 0, defaultCanvasWidth, defaultCanvasHeight);
        requestAnimationFrame(drawToCanvas);
    }, [videoCanvasCtx]);

    useEffect(() => {
        videoRef.current = document.createElement('video');
        videoCanvasRef.current = document.createElement('canvas');
        videoCanvasRef.current.width = defaultCanvasWidth;
        videoCanvasRef.current.height = defaultCanvasHeight;
        dispatch({
            type: 'setVideoCanvasWithCtx',
            payload: {
                videoCanvas: videoCanvasRef.current,
                videoCanvasCtx: videoCanvasRef.current.getContext('2d'),
            },
        });
    }, []);

    useEffect(() => {
        if (!videoCanvasCtx) {
            return;
        }

        drawToCanvas();
    }, [videoCanvasCtx]);

    useEffect(() => {
        if (!videoStream) {
            return;
        }

        const populateVideo = async () => {
            videoRef.current.srcObject = videoStream;
            await videoRef.current.play();
        };

        populateVideo();
    }, [videoStream]);


    return null;
};

export default VideoHandler;
