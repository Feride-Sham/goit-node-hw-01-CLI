const fs = require("fs");
const path = require("path");
const { v4: id } = require("uuid");
// import { v4 as id } from "uuid";

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const contact = JSON.parse(data).find((el) => contactId === el.id);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const contactList = JSON.parse(data);
    const updatedContactList = contactList.filter((el) => contactId !== el.id);
    console.table(updatedContactList);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const contactList = JSON.parse(data);
    const newContact = {
      id: id(),
      name,
      email,
      phone,
    };
    if (
      contactList.find((el) => el.name.toLowerCase() === name.toLowerCase())
    ) {
      console.log("Ooops, a contact with the same name already exists ");
      return;
    }

    const updatedContactList = [...contactList, newContact];

    // const updatedContactList = contactList.filter((el) => contactId !== el.id);
    console.table(updatedContactList);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
