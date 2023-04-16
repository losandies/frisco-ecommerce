import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getItems, reset } from "../redux/items/itemsSlice";

const DisplayPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
        dispatch(reset());
    }, []);

    return (
        <div
            className={`flex flex-col min-h-[100vh] overflow-x-hidden w-full relative md:overflow-x-auto`}
        >
            <div className="content-wrap md:pb-[195px]">
                <NavBar />
                <div className="h-full w-full flex">
                    <SideBar />
                    <ItemList />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default DisplayPage;
