import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  GET_CONTACTS,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FOUND_CONTACTS,
  ADD_CONTACT,
} from "./types";

export const fetchContacts = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:8000/api/contacts", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {}
};

export const addContact = (newContact) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "http://localhost:8000/api/contacts",
      {
        newContact,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: ADD_CONTACT, payload: res.data.contacts });
  } catch (err) {
    console.log(err);
  }
};

export const edit = (newContact, id) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(
      `http://localhost:8000/api/contacts/edit/${id}`,
      {
        newContact,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ADD_CONTACT, payload: res.data.contacts });
  } catch (err) {
    console.log(err);
  }
};

export const searchContact = (searchValue) => async (dispatch) => {
  if (searchValue.length >= 2) {
    const token = localStorage.getItem("token");
    let config = {
      token: {
        token,
      },
      params: {
        searchValue,
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:8000/api/contacts/search/`,
        config
      );

      dispatch({ type: FOUND_CONTACTS, payload: [res.data] });
    } catch (err) {
      console.log(err);
    }
  } else {
    dispatch({ type: "SEARCH_DELETED" });
  }
};

export const deleteContact = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(
      `http://localhost:8000/api/contacts/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DELETE_CONTACT, payload: res.data.contacts });
  } catch (err) {
    console.log(err.response);
  }
};
