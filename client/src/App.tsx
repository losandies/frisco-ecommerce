import { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {
    const { cart } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCartTotalItems());
    }, [dispatch, cart]);

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
