import React, {
    useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { store } from '../../store/store';

const MainCanvasWrapper = styled.div`
    width: 100%;
`;

const MainCanvas = () => {
    const { state, dispatch } = useContext(store);
    const {
        videoCanvas, defaultCanvasWidth, defaultCanvasHeight, audioCanvas, aspectRatio,
    } = state;
    const mainCanvasRef = useRef(null);
    const mainCanvasWrapperRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [wrapperWidth, setWrapperWidth] = useState(0);

    const drawToCanvas = useCallback(() => {
        ctx.clearRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);

        const inputWidth = defaultCanvasWidth;
        const inputHeight = defaultCanvasHeight;
        const inputImageAspectRatio = inputWidth / inputHeight;
        let outputWidth = inputWidth;
        let outputHeight = inputHeight;

        if (inputImageAspectRatio > aspectRatio) {
            outputWidth = inputHeight * aspectRatio;
        } else if (inputImageAspectRatio < aspectRatio) {
            outputHeight = inputWidth / aspectRatio;
        }

        const outputX = (outputWidth - inputWidth) * 0.5;
        const outputY = (outputHeight - inputHeight) * 0.5;
        const tempCanvas = document.createElement('canvas');
        const tempCanvasCtx = tempCanvas.getContext('2d');
        tempCanvas.width = defaultCanvasWidth;
        tempCanvas.height = defaultCanvasHeight;
        tempCanvasCtx.drawImage(
            videoCanvas,
            0,
            0,
            defaultCanvasWidth,
            defaultCanvasHeight,
            0,
            0,
            defaultCanvasWidth,
            defaultCanvasHeight,
        );
        tempCanvasCtx.drawImage(
            audioCanvas,
            0,
            0,
            defaultCanvasWidth,
            defaultCanvasHeight,
            0,
            0,
            defaultCanvasWidth,
            defaultCanvasHeight,
        );

        ctx.drawImage(
            tempCanvas,
            -outputX,
            outputY,
            outputWidth,
            outputHeight,
            0, 0, defaultCanvasWidth, defaultCanvasHeight,
        );
        requestAnimationFrame(drawToCanvas);
    }, [ctx, videoCanvas]);

    useEffect(() => {
        if (!mainCanvasWrapperRef.current) {
            return;
        }

        const { width } = mainCanvasWrapperRef.current.getBoundingClientRect();
        setWrapperWidth(width);
    }, [mainCanvasWrapperRef.current]);

    useEffect(() => {
        mainCanvasRef.current.width = defaultCanvasWidth;
        mainCanvasRef.current.height = defaultCanvasHeight;
        mainCanvasRef.current.setAttribute('style', `width:${wrapperWidth}px; height:${wrapperWidth / aspectRatio}px`);
        setCtx(mainCanvasRef.current.getContext('2d'));

        dispatch({
            type: 'setMainCanvasWithCtx',
            payload: {
                mainCanvas: mainCanvasRef.current,
                mainCanvasCtx: mainCanvasRef.current.getContext('2d'),
            },
        });
    }, [wrapperWidth]);

    useEffect(() => {
        if (!ctx || !videoCanvas) {
            return;
        }

        drawToCanvas();
    }, [ctx, videoCanvas]);

    return (
        <MainCanvasWrapper
            ref={mainCanvasWrapperRef}
        >
            <canvas ref={mainCanvasRef} />
        </MainCanvasWrapper>
    );
};

export default MainCanvas;
