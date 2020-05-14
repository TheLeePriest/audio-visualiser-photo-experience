import React, {
    useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { store } from '../../store/store';

const MainCanvas = () => {
    const { state, dispatch } = useContext(store);
    const {
        videoCanvas, defaultCanvasWidth, defaultCanvasHeight, audioCanvas, aspectRatio,
    } = state;
    const mainCanvasRef = useRef();
    const [ctx, setCtx] = useState(null);


    const drawToCanvas = useCallback(() => {
        ctx.clearRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);

        // get the aspect ratio of the input image
        const inputImageAspectRatio = defaultCanvasWidth / defaultCanvasHeight;

        // if it's bigger than our target aspect ratio
        let outputWidth = defaultCanvasWidth;
        let outputHeight = defaultCanvasHeight;
        if (inputImageAspectRatio > aspectRatio) {
            outputWidth = defaultCanvasHeight * aspectRatio;
        } else if (inputImageAspectRatio < aspectRatio) {
            outputHeight = defaultCanvasWidth / aspectRatio;
        }

        // calculate the position to draw the image at
        const outputX = (outputWidth - defaultCanvasWidth) * 0.5;
        const outputY = (outputHeight - defaultCanvasHeight) * 0.5;

        ctx.drawImage(videoCanvas, outputX, outputY, defaultCanvasWidth, defaultCanvasHeight);
        ctx.drawImage(audioCanvas, outputX, outputY, defaultCanvasWidth, defaultCanvasHeight);
        requestAnimationFrame(drawToCanvas);
    }, [ctx, videoCanvas]);


    useEffect(() => {
        mainCanvasRef.current.width = defaultCanvasWidth;
        mainCanvasRef.current.height = defaultCanvasHeight;
        setCtx(mainCanvasRef.current.getContext('2d'));

        dispatch({
            type: 'setMainCanvasWithCtx',
            payload: {
                mainCanvas: mainCanvasRef.current,
                mainCanvasCtx: mainCanvasRef.current.getContext('2d'),
            },
        });
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
