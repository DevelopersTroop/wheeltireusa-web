"use client"
import StickyVehicleSelector from '../header-ymm';
import YmmFilterModal from '../YmmFilterModal/YmmFilterModal';
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
            <YmmFilterModal/>
            <StickyVehicleSelector />
        </>
    );
};

export default Header;