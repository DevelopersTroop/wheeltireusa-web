"use client"
import { openMainFilterModal } from '@/redux/features/mainFilterSlice';
import { useDispatch } from 'react-redux';

const TireBrandFilter = () => {
    const dispatch = useDispatch();
    return (
        <>
            <button className='bg-white hover:bg-gray-100 p-[20px] w-full rounded-[6px] cursor-pointer' onClick={() => dispatch(openMainFilterModal())}>Search by Tire brand</button>
        </>
    );
};

export default TireBrandFilter;