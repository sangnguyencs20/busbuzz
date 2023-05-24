import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    departure: {
      _id: 0,
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
    destination: {
      _id: 0,
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
    clearDeparture: (state) => {
      state.departure = {
        _id: 0,
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
      };
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    clearDestination: (state) => {
      state.destination = {
        _id: 0,
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
      };
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

export const {
  setDeparture,
  clearDeparture,
  setDestination,
  clearDestination,
  setSearchType,
  swapLocations, 
} = searchSlice.actions;
export default searchSlice.reducer;
