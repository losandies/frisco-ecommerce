import React from "react";
import defaultAvatar from "/assets/default-avatar.jpg";

const MyAccountHeader = () => {
    return (
        <div className="w-full h-24 bg-neutral-800 flex items-end justify-center">
            <div className="w-32 h-32 rounded-[50%] relative top-[3.8rem]">
                <img
                    src={defaultAvatar}
                    alt=""
                    className="w-32 h-32 rounded-[50%] border-[3px] border-neutral-800"
                />
            </div>
        </div>
    );
};

export default MyAccountHeader;
