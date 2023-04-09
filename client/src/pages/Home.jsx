import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomepageContent from "../components/content/HomepageContent";
import ItemList from "../components/content/ItemList";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getItems } from "../redux/items/itemsSlice";
import { getCurrentUser, reset } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.items);
    const { currentPage } = useSelector((state) => state.nav);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(reset());
        if (!items) {
            dispatch(getItems());
        }
        if (user) {
            dispatch(getCurrentUser(user.id));
        }
    }, []);

    // window.location.reload();

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
