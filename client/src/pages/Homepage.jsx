import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getItems } from "../redux/items/itemsSlice";

const Homepage = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.items);
    const { currentPage } = useSelector((state) => state.nav);

    useEffect(() => {
        dispatch(getItems());
    }, []);

    return (
        <div className="flex flex-col h-auto relative">
            <NavBar />
            <div className="h-full w-full flex">
                <SideBar />
                <ItemList />
            </div>
            <Footer />
        </div>
    );
};

export default Homepage;
