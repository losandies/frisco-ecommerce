import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="h-full w-full">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
