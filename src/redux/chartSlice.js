import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

export const fetchData = createAsyncThunk("chart/fetchData", async () => {
  try {
    const response = await axios.get(
      "https://tetratrionofficial.github.io/hosted_api/assignment_dashboard.json"
    );

    const cleanedText = response.data.replace("Apollo", "");

    const data = JSON.parse(cleanedText);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chartSlice.reducer;
