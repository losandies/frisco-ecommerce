import type { ReactNode } from "react";
import React, { Children } from "react";

type AccountInfoContainerProps = { children: ReactNode; currentTab?: string };

const AccountInfoContainer = ({ children }: AccountInfoContainerProps) => {
    return (
        <div className="mt-20 w-full h-full flex justify-center">
            <div className="md:w-[80%] w-[90%]">{children}</div>
        </div>
    );
};

export default AccountInfoContainer;
