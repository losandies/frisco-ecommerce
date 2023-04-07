import { useEffect, useState } from "react";
import "./App.css";
import DisplayPage from "./pages/DisplayPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ItemListing from "./pages/ItemListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotalItems, getCartTotalPrice } from "./redux/cart/cartSlice";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import MyAccount from "./pages/MyAccount";
import { getUserSavedAddress } from "./redux/auth/authSlice";
import { MdAutoFixHigh } from "react-icons/md";

function App() {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const { amountOfItems, cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getCartTotalItems());
    }, [amountOfItems, cart]);

    useEffect(() => {
        if (user) {
            dispatch(getUserSavedAddress(user.id));
        }
    }, []);

    useEffect(() => {
        console.log(cart);
    }, [amountOfItems]);

    return (
        <div className="h-full w-full">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/:category/:subcategory"
                        element={<DisplayPage />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/:category/:subcategory/item/:id"
                        element={<ItemListing />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="/account" element={<MyAccount />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
