"use client"
import TopBar from './components/TopBar/TopBar';
import MiddleHeader from './components/MiddleHeader/MiddleHeader';
import MainMenu from './components/MainMenu/MainMenu';
import StickyVehicleSelector from '../header-ymm';

import { useEffect, useRef, useState } from 'react';

const Header = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            if (menuRef.current) {
                setHeaderHeight(menuRef.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        // Also check periodically or use ResizeObserver for more robustness
        const observer = new ResizeObserver(updateHeight);
        if (menuRef.current) observer.observe(menuRef.current);

        return () => {
            window.removeEventListener('resize', updateHeight);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <TopBar />
            <MiddleHeader />
            <div ref={menuRef} className="sticky top-0 z-50">
                <MainMenu />
            </div>
            <StickyVehicleSelector offset={headerHeight} />
        </>
    );
};

export default Header;