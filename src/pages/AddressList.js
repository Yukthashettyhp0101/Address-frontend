import {
  PersonFill,
  EnvelopeFill,
  TelephoneFill,
  GeoAltFill,
  XCircle,
  PencilSquare,
} from "react-bootstrap-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import { toast } from "react-toastify";
import styles from "../AddressList.module.css";

export const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const sampleData = [
    { "address": "Bangalore", 
      "email": "venu@gmail.com", 
      "id": 2, "name": "Venu", 
      "phone": "6478329123" },
    { "address": "Jayanagarrrr", 
      "email": "pram@gmail.com", 
      "id": 5, "name": "Pramod", 
      "phone": "7391748239" },
    { "address": "Kumta", 
      "email": "ram@gmail.com", 
      "id": 9, "name": "Ram", 
      "phone": "9608119560" },
    { "address": "vJKL", 
      "email": "j@gmail.com", 
      "id": 19, "name": "Jay", 
      "phone": "9632578211" },
    { "address": "Honnavar", 
      "email": "abb@gmai.com", 
      "id": 36, "name": "Abhi", 
      "phone": "9606889560" },
    { "address": "fdsd", 
      "email": "r@gmail.com", 
      "id": 38, "name": "Ram", 
      "phone": "9606881234" },
    { "address": "fds", 
      "email": "gani@gmail.com", 
      "id": 41, "name": "ganesha", 
      "phone": "1234567832" },
    { "address": "frds", 
      "email": "gani@gmail.com", 
      "id": 42, "name": "res", 
      "phone": "7988872239" }
];

  
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      // const response = await axios.get(`${process.env.REACT_APP_HOME_API}`);
      // setAddresses(response.data.length > 0 ? response.data : sampleData);
      console.log("Fetching address list dummy..")
    } catch (error) {
     
      setAddresses(sampleData);
    } finally {
      setLoading(false);
    }
  };

  // Delete an address
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_DELETE_API}${id}`);
        setAddresses(addresses.filter((address) => address.id !== id));
        toast.success("Address deleted successfully!");
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("Failed to delete address.");
      }
    }
  };

  // Handle edit mode activation
  const handleEditClick = (address) => {
    setEditingId(address.id);
    setFormData({
      name: address.name,
      email: address.email,
      phone: address.phone,
      address: address.address,
    });
  };

  // Handle input change in edit form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update address
  const handleUpdate = async (id) => {
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.warn("Invalid phone number. Enter a 10-digit number starting with 6-9.");
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_UPDATE_API}${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Address updated successfully!");
      setAddresses(addresses.map((addr) => (addr.id === id ? { ...addr, ...formData } : addr)));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        {loading ? (
          <p className={styles.loadingMessage}>Loading addresses...</p>
        ) : addresses.length !== 0 ? (
          addresses.map((address) => (
            <div key={address.id} className={styles.enhancedList}>
              {editingId === address.id ? (
                <div className={styles.editFields}>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                  <div className={styles.buttonContainer}>
                    <button className={styles.btnSuccess} onClick={() => handleUpdate(address.id)}>Save</button>
                    <button className={styles.btnCancel} onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className={styles.list}>
                  <div className={styles.iconContainer}>
                    <PencilSquare className={styles.iconEdit} onClick={() => handleEditClick(address)} title="Edit Address" />
                    <XCircle className={styles.iconDelete} onClick={() => handleDelete(address.id)} title="Delete Address" />
                  </div>
                  <h5><PersonFill /> {address.name}</h5>
                  <h5><EnvelopeFill /> {address.email}</h5>
                  <h5><TelephoneFill /> {address.phone}</h5>
                  <h5><GeoAltFill /> {address.address}</h5>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>No addresses found. Add a new address to get started!</p>
        )}
      </div>
    </>
  );
};
