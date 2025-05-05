import React from 'react';
import YmmFilter from './YmmFilter';
import TireSizeFilter from './TireSizeFilter';
import TireBrandFilter from './TireBrandFilter';


const HeroFilter = () => {
    return (
        <div>
            <div className='hero-filter flex justify-between gap-8 mt-5'>
                <div>
                    <YmmFilter />
                </div>
                <div>
                    <TireSizeFilter/>
                </div>
                <div>
                    <TireBrandFilter/>
                </div>
            </div>
        </div>
    );
};

export default HeroFilter;