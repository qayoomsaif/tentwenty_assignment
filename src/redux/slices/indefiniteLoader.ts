import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'


interface IndefiniteLoaderState {
  animationIndex: number;
}


const initialState: IndefiniteLoaderState = {
  animationIndex: 0
};

export const loadAnimationIndex = createAsyncThunk('indefiniteLoader/loadAnimationIndex', async () => {
  const index = await AsyncStorage.getItem('animationIndex')
  return index ? JSON.parse(index) : 0
})


const indefiniteLoaderSlice= createSlice({
  name: 'indefiniteLoader',
  initialState,
  reducers: {

    setAnimationIndex(state, action: PayloadAction<number>){
      state.animationIndex = action.payload
      AsyncStorage.setItem('animationIndex', JSON.stringify(action.payload))
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadAnimationIndex.fulfilled, (state, action) => {
      state.animationIndex = action.payload
    })
  }
});




export const {
setAnimationIndex
} = indefiniteLoaderSlice.actions;

export default indefiniteLoaderSlice.reducer;
