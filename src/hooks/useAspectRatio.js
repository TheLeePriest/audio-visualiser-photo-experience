import { useState, useEffect } from 'react';

const useAspectRatio = (aspectRatio, canvasWidth, canvasHeight) => {
    const [outputX, setOutputX] = useState(0);
    const [outputY, setOutputY] = useState(0);
    const [outputWidth, setOutputWidth] = useState(canvasWidth);
    const [outputHeight, setOutputHeight] = useState(canvasHeight);
    const inputImageAspectRatio = canvasWidth / canvasHeight;

    useEffect(() => {
        if (inputImageAspectRatio > aspectRatio) {
            setOutputWidth(canvasHeight * aspectRatio);
        } else if (inputImageAspectRatio < aspectRatio) {
            setOutputHeight(canvasWidth / aspectRatio);
        }
    }, []);

    useEffect(() => {
        setOutputX((outputWidth - canvasWidth) * 0.5);
        setOutputY((outputHeight - canvasHeight) * 0.5);
    }, [outputWidth, outputHeight]);

    return [outputX, outputY, outputWidth, outputHeight];
};

export default useAspectRatio;
