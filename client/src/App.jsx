import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ItemListing from "./pages/ItemListing";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="h-full w-full">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/item/:id" element={<ItemListing />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
