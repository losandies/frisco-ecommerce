import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomepageContent from "../components/content/HomepageContent";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getItems } from "../redux/items/itemsSlice";
import { getCurrentUser, reset } from "../redux/auth/authSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.items);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getCurrentUser(user));
        }

        if (!items) {
            dispatch(getItems());
        }
        dispatch(reset());
    }, []);

    return (
        <div className="flex flex-col min-h-[100vh] w-full relative">
            <div className="content-wrap min-h-[100vh] md:pb-[195px]">
                <NavBar />
                <div className="h-full w-full flex flex-row justify-between">
                    <div>
                        <SideBar />
                    </div>

                    <div>
                        <HomepageContent />
                    </div>
                    <div></div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
