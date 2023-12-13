import Search from "./components/search/Search"; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Search />
    </div>
  );
}

export default App;
