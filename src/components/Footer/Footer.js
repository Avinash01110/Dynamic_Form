import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-violet-500 text-white py-6"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Dynamic Form Builder. Made By{" "}
            <span className="font-semibold">Avinash Gupta</span> ⌨
          </p>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
