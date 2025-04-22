"use client";
import React from 'react';
import { Provider } from "react-redux";
import Store, { persistor } from "@/redux/store";
import { PersistGate } from 'redux-persist/integration/react';

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default ReduxWrapper;