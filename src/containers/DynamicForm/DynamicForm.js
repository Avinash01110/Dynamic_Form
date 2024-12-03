import React, { useState } from "react";
import { mockApi } from "../../api/mockApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedFormType, setSelectedFormType] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const handleDropdownChange = (event) => {
    const selectedForm = event.target.value;
    setSelectedFormType(selectedForm);
    setFormFields(mockApi[selectedForm]?.fields || []);
    setFormData({});
    setProgress(0);
    setFieldErrors({});
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear individual field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    calculateProgress();
  };

  const calculateProgress = () => {
    const requiredFields = formFields.filter((field) => field.required);
    const totalRequired = requiredFields.length;
    const filledRequiredFields = requiredFields.filter(
      (field) => formData[field.name]
    ).length;

    setProgress(
      totalRequired > 0 ? (filledRequiredFields / totalRequired) * 100 : 0
    );
  };

  const validateForm = () => {
    const errors = {};
    formFields.forEach((field) => {
      if (
        field.required &&
        (!formData[field.name] || formData[field.name].trim() == "")
      ) {
        errors[field.name] = `${field.label} is required`;
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length == 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (editingId) {
      // Update existing entry
      setSubmittedData((prev) =>
        prev.map((entry) =>
          entry.id == editingId
            ? { ...entry, ...formData, formType: selectedFormType }
            : entry
        )
      );
      toast.success("Entry updated successfully!");
    } else {
      // Add new entry
      const submissionData = {
        ...formData,
        formType: selectedFormType,
        id: Date.now(),
      };
      setSubmittedData((prev) => [...prev, submissionData]);
      toast.success("Form submitted successfully!");
    }

    // Reset form
    setFormData({});
    setProgress(0);
    setEditingId(null);
  };

  const handleEditEntry = (id) => {
    const entryToEdit = submittedData.find((entry) => entry.id == id);
    if (entryToEdit) {
      // Set form fields based on the selected entry's form type
      setSelectedFormType(entryToEdit.formType);
      setFormFields(mockApi[entryToEdit.formType]?.fields || []);

      // Prepare form data for editing (remove formType and id)
      const editData = { ...entryToEdit };
      delete editData.formType;
      delete editData.id;

      setFormData(editData);
      setEditingId(id);
    }
  };

  const handleDeleteEntry = (id) => {
    setSubmittedData((prev) => prev.filter((entry) => entry.id !== id));
    toast.success("Entry deleted successfully.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar
        selectedFormType={selectedFormType}
        handleDropdownChange={handleDropdownChange}
      />


      {/* Form Content */}
      <div className="bg-[url('https://img.freepik.com/premium-vector/big-data-visual-information-background-social-network-concept-connection-vector-background_165143-1406.jpg')] w-full h-full min-h-screen">
        <div className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
          {/* Dynamic Form */}
          {formFields.length > 0 && (
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              {formFields.map((field) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type == "dropdown" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                        ${fieldErrors[field.name] ? "border-red-500" : ""}`}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                        ${fieldErrors[field.name] ? "border-red-500" : ""}`}
                      min={field.name == "age" ? 0 : ""}
                      maxLength={field.name == "cvv" ? 4 : ""}
                    />
                  )}
                  {fieldErrors[field.name] && (
                    <p className="text-red-500 text-xs italic">
                      {fieldErrors[field.name]}
                    </p>
                  )}
                </motion.div>
              ))}

              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-blue-600 h-2.5 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Form Completion: {progress.toFixed(0)}%
                </p>
              </motion.div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Form
              </button>
            </motion.form>
          )}

          {/* Submitted Data Table */}
          {submittedData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold mb-4 bg-white w-fit text-slate-800">
                Submitted Entries
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">S.No</th>
                      <th className="py-3 px-6 text-left">Form Type</th>
                      <th className="py-3 px-6 text-left">Data</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {submittedData.map((entry, index) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left capitalize">
                          {index + 1}
                        </td>
                        <td className="py-3 px-6 text-left capitalize">
                          {entry.formType.replace("Info", "")}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {Object.entries(entry)
                            .filter(
                              ([key]) => !["id", "formType"].includes(key)
                            )
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(", ")}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleEditEntry(entry.id)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DynamicForm;
