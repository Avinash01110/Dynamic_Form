# Dynamic Form Implementation in React

This project demonstrates a dynamic form implementation using **React** and **Tailwind CSS**. The form structure dynamically changes based on user selections and is generated based on a mock API response. It also includes features like form validation, progress tracking, and data management.

## Features
- Dynamic form fields rendered based on user selection (mock API responses).
- Responsive UI with Tailwind CSS.
- Real-time progress tracking of form completion.
- Validation for required fields with inline error messages.
- Submission success message and form reset after successful submission.
- View, edit, and delete submitted form entries in a tabular format.
- Graceful error handling and feedback for user actions.

## Project Structure
- src/components: Contains reusable components (e.g., Form, Table).
- src/mockApi.js: Includes mock API responses for different form types.
- src/App.js: Main application logic and state management.
- src/index.css: Tailwind CSS configuration and styles.

## Usage
- Select a form type from the dropdown menu (e.g., User Information, Address Information).
- Fill out the form fields dynamically rendered based on the selected form type.
- Submit the form to view the data in a table.
- Edit or delete entries using the respective buttons in the table.

## Dependencies
- React
- Tailwind CSS
- React Hot Toast
- Framer motion
