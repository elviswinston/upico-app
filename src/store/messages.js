import { createSlice, createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "messages",
  initialState: {
    messageHubs: [],
    selectedHubId: null,
  },
  reducers: {
    messageHubsLoadded: (state, action) => {
      state.messageHubs = action.payload;
      if (state.messageHubs.length !== 0) {
        state.selectedHubId = state.messageHubs[0].id;
      }
    },
    messageAdded: (state, action) => {
      const message = action.payload;
      const index = state.messageHubs.findIndex(
        (mh) => mh.id === message.messageHubId
      );

      if (index !== -1) state.messageHubs[index]?.messages.push(message);
    },
    hubIdSelected: (state, action) => {
      const hubId = action.payload;
      state.selectedHubId = hubId;
    },
  },
});

export default slice.reducer;

const { messageHubsLoadded, messageAdded, hubIdSelected } = slice.actions;

//selectors
export const getSelectedHub = createSelector(
  (state) => state.message.messageHubs,
  (state) => state.message.selectedHubId,
  (messageHubs, selectedHubId) => {
    return messageHubs.find((m) => m.id === selectedHubId);
  }
);

//action creators
export const loadMessageHubs = (messageHubs) => async (dispatch) => {
  dispatch(messageHubsLoadded(messageHubs));
};

export const addMessage = (message) => async (dispatch) => {
  dispatch(messageAdded(message));
};

export const selectHub = (hubId) => (dispatch) => {
  dispatch(hubIdSelected(hubId));
};
