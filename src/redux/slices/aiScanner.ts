import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logger } from "@utils/Helpers";
// import { OCRMode, OCRType } from "react-native-vision-sdk";

interface AiScannerState {
    captureMode: 'manual' | 'auto';
    ocrMode: any;
    ocrType: any;
    isLoading: boolean;
    data: Record<any, any> | null;
    mode: 'barcode' | 'qrcode' | 'ocr' | 'photo';
    isModelDownloading: boolean;
    isModelDownloaded: boolean;
    modelDownloadProgress: number;
    capturedImage?: string | null;
}

const initialState: AiScannerState = {
    captureMode: 'manual',
    ocrType: 'shipping_label',
    ocrMode: 'cloud',
    isLoading: false,
    data: null,
    mode: 'ocr',
    isModelDownloading: false,
    isModelDownloaded: false,
    modelDownloadProgress: 0,
    capturedImage: null
};

const aiScannerSlice = createSlice({
    name: 'aiScanner',
    initialState,
    reducers: {
        setCaptureMode(state, action: PayloadAction<'manual' | 'auto'>) {
            state.captureMode = action.payload;
        },
        setCapturedImage(state, action: PayloadAction<string | null>) {
            state.capturedImage = action.payload;
        },
        setOCRMode(state, action: PayloadAction<any>) {
          state.ocrMode = action.payload
        },
        setOcrType(state, action: PayloadAction<any>) {
            state.ocrType = action.payload;
        },
        setIfLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setData(state, action: PayloadAction<Record<any, any>>) {
            state.data = action.payload;
        },
        setMode(state, action: PayloadAction<'barcode' | 'qrcode' | 'ocr' | 'photo'>) {
            state.mode = action.payload;
        },
        setModelDownloadProgress(state, action: PayloadAction<{isModelDownloading: boolean, isModelDownloaded: boolean, modelDownloadProgress: number}>) {
            if(action?.payload?.modelDownloadProgress){
                state.modelDownloadProgress = parseFloat((action?.payload?.modelDownloadProgress * 100).toFixed(2));
            }

            state.isModelDownloading = action.payload.isModelDownloading;
            state.isModelDownloaded = action.payload.isModelDownloaded;
        },
        resetState(){
          return initialState
        }
    }
})

export const {
    setCaptureMode,
    setOcrType,
    setIfLoading,
    setData,
    setModelDownloadProgress,
    setCapturedImage,
    setOCRMode,
    resetState
} = aiScannerSlice.actions

export default aiScannerSlice.reducer
