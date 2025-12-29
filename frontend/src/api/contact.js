// frontend/src/api/contact.js
import api from "../lib/axios";

const getContacts = async () => {
    const response = await api.get("/api/contacts");
    return response.data;
};

const getContact = async (id) => {
    const response = await api.get(`/api/contacts/${id}`);
    return response.data;
};

const createContact = async (data) => {
    const response = await api.post("/api/contacts", data);
    return response.data;
};

const updateContact = async (id, data) => {
    const response = await api.put(`/api/contacts/${id}`, data);
    return response.data;
};

const deleteContact = async (id) => {
    const response = await api.delete(`/api/contacts/${id}`);
    return response.data;
};

export { getContacts, getContact, createContact, updateContact, deleteContact };
