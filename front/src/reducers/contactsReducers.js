import {
  GET_CONTACTS,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FOUND_CONTACTS,
  ADD_CONTACT,
} from "../actions/types";

const initialState = {
  contacts: null,
  isLoading: false,
  found: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        isLoading: true,
      };
    case ADD_CONTACT:
      return {
        isLoading: false,
        contacts: action.payload,
      };
    case FOUND_CONTACTS:
      return {
        ...state,
        found: action.payload,
      };
    case "SEARCH_DELETED":
      return {
        ...state,
        found: null,
      };
    case DELETE_CONTACT:
      return {
        isLoading: false,
        contacts: action.payload,
      };
    default:
      return state;
  }
}
