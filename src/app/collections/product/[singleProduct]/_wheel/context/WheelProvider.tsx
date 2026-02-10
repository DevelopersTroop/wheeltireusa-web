"use client"
import React from 'react';

export type TWheelContext = {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const WheelContext = React.createContext({} as TWheelContext);

const WheelProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [quantity, setQuantity] = React.useState(1);
    const value: TWheelContext = { quantity, setQuantity }

    return (
        <WheelContext.Provider value={value}>
            {children}
        </WheelContext.Provider>
    );
};


export default WheelProvider;
