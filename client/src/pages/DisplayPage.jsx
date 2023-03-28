import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getItems, reset } from "../redux/items/itemsSlice";
import { sizes } from "../screenSizes";

const DisplayPage = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.items);
    const { currentPage } = useSelector((state) => state.nav);

    const isMobile = useMediaQuery({ maxWidth: sizes.md });

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
