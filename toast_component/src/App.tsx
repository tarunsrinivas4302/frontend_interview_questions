import "./App.css";
import Buttons from "./components/buttons";
import ToastContextProvider from "./context/toast-context";

function App() {
  return (
    <ToastContextProvider>
      <Buttons />
    </ToastContextProvider>
  );
}

export default App;
