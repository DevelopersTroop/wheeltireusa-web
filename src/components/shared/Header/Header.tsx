"use client"
import StickyVehicleSelector from '../header-ymm';
import MainMenu from './components/MainMenu/MainMenu';
import MiddleHeader from './components/MiddleHeader/MiddleHeader';

import { useRef } from 'react';

const Header = () => {
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* <TopBar /> */}
            <MiddleHeader />
            <div ref={menuRef} >
                <MainMenu />
            </div>
            {/* <StickyVehicleSelector /> */}
        </>
    );
};

export default Header;