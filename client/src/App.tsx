import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/misc/PrivateRoute';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import DisplayPage from './pages/DisplayPage';
import Home from './pages/Home';
import ItemListing from './pages/ItemListing';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';
import Register from './pages/Register';
import { getCartTotalItems } from './redux/cart/cartSlice';
import { getCurrentUser } from './redux/user/userSlice';

function App() {
    const { amountOfItems, cart } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCartTotalItems());
    }, [amountOfItems, cart]);

    useEffect(() => {
        if (user) {
            dispatch(getCurrentUser(user.token));
        }
    }, []);

    return (
        <div className='h-full w-full'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route
                        path='/:category/:subcategory'
                        element={<DisplayPage />}
                    />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/:category/:subcategory/item/:id'
                        element={<ItemListing />}
                    />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/checkout' element={<CheckOut />} />
                    <Route path='/account' element={<PrivateRoute />}>
                        <Route path='/account' element={<MyAccount />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
