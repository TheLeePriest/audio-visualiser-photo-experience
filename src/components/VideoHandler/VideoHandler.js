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
        videoRef.current.setAttribute('autoplay', '');
        videoRef.current.setAttribute('muted', '');
        videoRef.current.setAttribute('playsinline', '');

        videoCanvasRef.current = document.createElement('canvas');
        videoCanvasRef.current.width = defaultCanvasWidth;
        videoCanvasRef.current.height = defaultCanvasHeight;


        const videoCtx = videoCanvasRef.current.getContext('2d');
        videoCtx.translate(defaultCanvasWidth, 0);
        videoCtx.scale(-1, 1);

        dispatch({
            type: 'setVideoCanvasWithCtx',
            payload: {
                videoCanvas: videoCanvasRef.current,
                videoCanvasCtx: videoCtx,
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
