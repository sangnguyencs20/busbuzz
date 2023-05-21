import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    departure: {
      id: 0,
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
    destination: {
      id: 0,
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
    isDepartureSearch: true, // Assuming departure search is the initial search type
  },
  reducers: {
    setDeparture: (state, action) => {
      state.departure = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setSearchType: (state, action) => {
      state.isDepartureSearch = action.payload;
    },
    swapLocations: (state) => {
      const tempDeparture = { ...state.departure };
      const tempDestination = { ...state.destination };

      state.departure = tempDestination;
      state.destination = tempDeparture;
    },
  },
});

export const { setDeparture, setDestination, setSearchType, swapLocations } = searchSlice.actions;
export default searchSlice.reducer;
