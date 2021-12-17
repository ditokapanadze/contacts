import React, { useEffect, useState } from "react";
import "./contacts.css";
import AddForm from "./AddForm";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrPowerShutdown } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "./EditForm";
import { fetchContacts } from "../../actions/contactsActions";
import { searchContact } from "../../actions/contactsActions";
import { deleteContact } from "../../actions/contactsActions";

function Contacts() {
  let dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const state = useSelector((state) => console.log(state));
  const [search, setSearch] = useState("");
  const [editContact, setEditContact] = useState();
  const [edit, setEdit] = useState(false);

  let history = useHistory();
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchContact(search));
  };

  const handleDelete = (e) => {
    dispatch(deleteContact(e));
  };
  const handleEdit = (contact) => {
    setEditContact(contact);
  };
  const handleCall = async (contact) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/contacts/call",

        contact,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className="contactsContainer">
      <div className="contactsWrapper">
        <div className="logout">
          <GrPowerShutdown className="logoutBtn" onClick={logout} />
        </div>

        <h1>Contacts list</h1>
        <input
          placeholder="search"
          className="searchInput"
          value={search}
          onChange={handleSearch}
        />
        <AddForm editContact={editContact} setEditContact={setEditContact} />
        {contacts?.found
          ? contacts?.found.map((contact) => (
              <div className="contactContainer" key={contact._id}>
                <p className="contactInfo">
                  <BsFillTelephoneFill
                    onClick={() => handleCall(contact)}
                    style={{ marginRight: "20px", cursor: "pointer" }}
                  />
                  {contact.username}: {contact.number}
                </p>
                <div className="contactButtons">
                  <FaPen
                    className="contactIcon"
                    onClick={() => handleEdit(contact)}
                  />

                  <FaTrashAlt
                    className="contactIcon"
                    onClick={() => handleDelete(contact._id)}
                  />
                </div>
              </div>
            ))
          : contacts?.contacts?.map((contact) => (
              <div className="contactContainer" key={contact._id}>
                <p className="contactInfo">
                  <BsFillTelephoneFill
                    onClick={() => handleCall(contact)}
                    style={{ marginRight: "20px", cursor: "pointer" }}
                  />
                  {contact.username}: {contact.number}
                </p>
                <div className="contactButtons">
                  <FaPen
                    className="contactIcon"
                    onClick={() => handleEdit(contact)}
                  />

                  <FaTrashAlt
                    className="contactIcon"
                    onClick={() => handleDelete(contact._id)}
                  />
                </div>
              </div>
            ))}
        {/* {contacts?.contacts?.map((contact) => (
          <div className="contactContainer" key={contact._id}>
            <p className="contactInfo">
              <BsFillTelephoneFill
                onClick={() => handleCall(contact)}
                style={{ marginRight: "20px", cursor: "pointer" }}
              />
              {contact.username}: {contact.number}
            </p>
            <div className="contactButtons">
              <FaPen
                className="contactIcon"
                onClick={() => handleEdit(contact)}
              />

              <FaTrashAlt
                className="contactIcon"
                onClick={() => handleDelete(contact._id)}
              />
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Contacts;
