import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Order from "./Order";

const OrdersDisplay = () => {
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log(user.orders);
    });

    return (
        <div className="mt-5">
            {user.orders.map((order) => (
                <Order order={order} />
            ))}
        </div>
    );
};

export default OrdersDisplay;
