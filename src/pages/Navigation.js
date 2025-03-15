import React from "react";
import { PlusCircleFill } from 'react-bootstrap-icons';
import styles from "../Navigation.module.css"; 
import { Addaddress } from "./Addaddress";

export const Navigation = () => {
  return (
    <>
      <nav className={`${styles.navContainer} shadow-lg p-3  rounded d-flex justify-content-between align-items-center`}>
        
        <div className={`${styles.logoTitle} d-flex align-items-center`}>
          <img
            width="50"
            height="50"
            className={styles.logo}
            src="https://img.icons8.com/?size=100&id=vkF8cRYKdxQ3&format=png&color=000000"
            alt="Address Book Logo"
          />
          <h3 className={styles.title}>Address-Book</h3>
        </div>

        
        <button
          type="button"
          className={`btn btn-primary d-flex align-items-center gap-2 ${styles.addButton}`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <PlusCircleFill className="fs-5" /> Add Address
        </button>
      </nav>


      <Addaddress />
    </>
  );
};

export default Navigation;
