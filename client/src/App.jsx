import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ItemListing from "./pages/ItemListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";

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
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
