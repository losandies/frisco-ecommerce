import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomepageContent from "../components/content/HomepageContent";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { getCurrentUser, reset } from "../redux/user/userSlice";
import PageContainer from "../components/misc/PageContainer";

const Home = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            dispatch(getCurrentUser(user.token));
        }
        dispatch(reset());
    }, []);

    return (
        <PageContainer>
            <NavBar />
            <div className="h-full w-full flex flex-row md:mb-[150px] justify-between">
                <div className="lg:mr-5">
                    <SideBar />
                </div>

                <div>
                    <HomepageContent />
                </div>
                <div></div>
            </div>
        </PageContainer>
    );
};

export default Home;
