import React from "react";
import { motion } from "framer-motion";

const Navbar = ({ selectedFormType, handleDropdownChange }) => {
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 shadow-md"
      >
        <div className="container mx-auto px-4 text-center flex flex-col gap-4 md:flex-row items-center justify-between">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl font-semibold tracking-wider"
          >
            Dynamic Form Builder
          </motion.h1>
          <div className="max-w-md">
            <select
              value={selectedFormType}
              onChange={handleDropdownChange}
              className="w-full p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Form Type</option>
              <option value="userInfo">User Information</option>
              <option value="addressInfo">Address Information</option>
              <option value="paymentInfo">Payment Information</option>
            </select>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
