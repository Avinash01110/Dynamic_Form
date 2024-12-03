import "./App.css";
import DynamicForm from "./containers/DynamicForm/DynamicForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <DynamicForm />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
