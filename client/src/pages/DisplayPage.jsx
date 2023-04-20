import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getItems, reset } from "../redux/items/itemsSlice";
import PageContainer from "../components/misc/PageContainer";

const DisplayPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
        dispatch(reset());
    }, []);

    return (
        <PageContainer>
            <NavBar />
            <div className="h-full w-full flex flex-row md:mb-[50px] justify-between">
                <div className="lg:mr-5">
                    <SideBar />
                </div>
                <ItemList />
            </div>
        </PageContainer>
    );
};

export default DisplayPage;
