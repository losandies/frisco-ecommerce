import { useEffect } from "react";
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
import { getCartTotalItems } from "./redux/cart/cartSlice";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import MyAccount from "./pages/MyAccount";
import PrivateRoute from "./components/misc/PrivateRoute";

function App() {
    const { amountOfItems, cart } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartTotalItems());
    }, [amountOfItems, cart]);

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
                    <Route path="/account" element={<PrivateRoute />}>
                        <Route path="/account" element={<MyAccount />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
