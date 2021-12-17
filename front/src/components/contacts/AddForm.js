import React, { useState, useEffect } from "react";
import "./addform.css";
import Input from "../Input";
import { FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addContact } from "../../actions/contactsActions";
import { edit } from "../../actions/contactsActions";

function AddForm({ editContact, setEditContact }) {
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();

    const newContact = {
      username,
      number,
    };
    if (number.length > 2 && username.length > 3) {
      editContact
        ? dispatch(edit(newContact, editContact._id))
        : dispatch(addContact(newContact));
      setNumber("");
      setEditContact(false);
      setUsername("");
    }
  };
  useEffect(() => {
    if (editContact) {
      setNumber(editContact.number);
      setUsername(editContact.username);
    }
  }, [editContact]);

  return (
    <form className="addForm">
      <input
        value={username}
        placeHolder="Name "
        className="addInput"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={number}
        placeHolder="Number"
        className="addInput"
        onChange={(e) => setNumber(e.target.value)}
      />
      <button className="addBtn" onClick={handleAdd}>
        {editContact ? "Edit Contact" : "Add Contact"}
      </button>
    </form>
  );
}

export default AddForm;
