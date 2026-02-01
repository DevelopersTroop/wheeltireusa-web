"use client"
import React from 'react';

export type TTireContext = {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const TireContext = React.createContext({} as TTireContext);

const TireProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [quantity, setQuantity] = React.useState(1);
    const value: TTireContext = { quantity, setQuantity }

    return (
        <TireContext.Provider value={value}>
            {children}
        </TireContext.Provider>
    );
};


export default TireProvider;