import React, {
    useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { store } from '../../store/store';

const MainCanvas = () => {
    const { state } = useContext(store);
    const {
        videoCanvas, defaultCanvasWidth, defaultCanvasHeight, audioCanvas,
    } = state;
    const mainCanvasRef = useRef();
    const [ctx, setCtx] = useState(null);

    const drawToCanvas = useCallback(() => {
        ctx.clearRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);
        ctx.drawImage(videoCanvas, 0, 0, defaultCanvasWidth, defaultCanvasHeight);
        ctx.drawImage(audioCanvas, 0, 0, defaultCanvasWidth, defaultCanvasHeight);
        requestAnimationFrame(drawToCanvas);
    }, [ctx, videoCanvas]);


    useEffect(() => {
        mainCanvasRef.current.width = defaultCanvasWidth;
        mainCanvasRef.current.height = defaultCanvasHeight;
        setCtx(mainCanvasRef.current.getContext('2d'));
    }, []);

    useEffect(() => {
        if (!ctx || !videoCanvas) {
            return;
        }

        drawToCanvas();
    }, [ctx, videoCanvas]);

    return <canvas ref={mainCanvasRef} />;
};

export default MainCanvas;
