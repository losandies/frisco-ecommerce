import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ItemListing from "./pages/ItemListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotalItems, getCartTotalPrice } from "./redux/cart/cartSlice";

function App() {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const { amountOfItems, cart } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartTotalItems());
    }, [amountOfItems, cart]);

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
