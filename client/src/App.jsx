import { useState } from "react";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import Homepage from "./pages/Homepage";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="h-full w-full">
            <Homepage />
        </div>
    );
}

export default App;
