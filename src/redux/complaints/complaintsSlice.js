import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch complaints
export const fetchComplaints = createAsyncThunk(
  "complaints/fetchComplaints",
  async () => {
    const res = await fetch("https://addcomplaintdata.onrender.com/api/complaints");
    return await res.json();
  }
);
// Thunk to update complaint status
export const updateComplaintStatus = createAsyncThunk(
  "complaints/updateComplaintStatus",
  async ({ id, status }) => {
    const response = await fetch(`https://addcomplaintdata.onrender.com/api/complaints/${id}`, {
      method: "PATCH", // or PUT based on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    return data;
  }
);


const complaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addComplaint: (state, action) => {
     state.data.unshift(action.payload); // adds new complaint at the front
    },
    setComplaints: (state, action) => {
      state.data = action.payload;
    },
    deleteComplaint: (state, action) => {
    const idToDelete = action.payload;
    state.data = state.data.filter((complaint) => complaint.id !== idToDelete);
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        const updatedComplaint = action.payload;
        const index = state.data.findIndex((c) => c.id === updatedComplaint.id);
        if (index !== -1) {
          state.data[index] = updatedComplaint;
        }
      });
  },
});

export const { addComplaint, setComplaints, deleteComplaint } = complaintsSlice.actions;
export default complaintsSlice.reducer;
