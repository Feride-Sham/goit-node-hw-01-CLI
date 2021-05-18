const fs = require("fs/promises");
const path = require("path");
const { v4: id } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.error(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((res) => res.find((el) => String(contactId) === String(el.id)))
    .then((contact) => console.log(contact))
    .catch((err) => console.error(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((res) => res.filter((el) => String(contactId) !== String(el.id)))
    .then((updatedContactList) => {
      fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
      console.table(updatedContactList);
    })
    .catch((err) => console.error(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contactList) => {
      const newContact = {
        id: id(),
        name,
        email,
        phone,
      };

      const isExistingName = contactList.find(
        (el) => el.name.toLowerCase() === name.toLowerCase()
      );
      if (isExistingName) {
        console.log("Ooops, a contact with the same name already exists ");
        return;
      }

      const updatedContactList = [...contactList, newContact];

      fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
      console.table(updatedContactList);
    })
    .catch((err) => console.error(err));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
