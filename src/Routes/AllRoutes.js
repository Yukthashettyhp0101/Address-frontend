import { Routes, Route } from "react-router-dom";
import { Addaddress } from "../pages/Addaddress";
import { AddressList } from "../pages/AddressList";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AddressList />} />
      <Route path="/add" element={<Addaddress />} />
    </Routes>
  );
};

export default AllRoutes;
