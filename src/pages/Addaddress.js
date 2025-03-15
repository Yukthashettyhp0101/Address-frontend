import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../Addaddress.module.css"; 

export const Addaddress = ({ onAddressAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, phone, address } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;

    if (name.trim().length < 2) {
      toast.warn("Name must be at least 2 characters long.");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.warn("Invalid phone number. It must be 10 digits and start with 6-9.");
      return false;
    }
    if (address.trim().length < 5) {
      toast.warn("Address must be at least 5 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log("API Endpoint:", process.env.REACT_APP_ADD_API); 
      const response = await axios.post(`${process.env.REACT_APP_ADD_API}`, formData);
      toast.success("Address added successfully!");

      
      setFormData({ name: "", email: "", phone: "", address: "" });

      
      
      onAddressAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addaddressContainer}>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${styles.modalContent}`}>
            <div className={`modal-header ${styles.modalHeader}`}>
              <h5 className={styles.modalTitle}>Add Address</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={`modal-body ${styles.modalBody}`}>
                <div className={`addaddress-fields ${styles.formGroup}`}>
                  <input 
                    type="text" 
                    name="name" 
                    className="w-75"
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter Name" 
                    required 
                  />
                </div>

                <div className={`addaddress-fields ${styles.formGroup}`}>
                  <input 
                    type="email" 
                    name="email" 
                    className="w-75"
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter Email" 
                    required 
                  />
                </div>

                <div className={`addaddress-fields ${styles.formGroup}`}>
                  <input
                    type="tel"
                    name="phone"
                    className="w-75"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[6-9]{1}[0-9]{9}"
                    title="Please enter a valid 10-digit phone number starting with 6-9"
                    autoComplete="off"
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>

                <div className={`addaddress-fields  ${styles.formGroup}`}>
                  <textarea 
                    name="address" 
                    className="w-75"
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="Enter Address" 
                    required 
                  />
                </div>
              </div>
              <div className={`modal-footer ${styles.modalFooter}`}>
                
                <button type="submit" className={`btn btn-primary ${styles.btnPrimary}`} disabled={loading}>
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
