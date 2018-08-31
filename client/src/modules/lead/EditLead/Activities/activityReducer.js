import { LOAD_LEAD_ACTIVITIES, UPDATE_ACTIVITY } from "./types";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case LOAD_LEAD_ACTIVITIES:
            return action.payload;
        default:
            return state;
    }
}
