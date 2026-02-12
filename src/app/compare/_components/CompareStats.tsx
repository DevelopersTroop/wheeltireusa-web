'use client';

import { IoInformationCircle, IoCheckmark } from 'react-icons/io5';
import { FaExclamationTriangle } from 'react-icons/fa';

interface CompareStatsProps {
    totalSpecs: number;
    differences: number;
    similarities: number;
}

const CompareStats = ({
    totalSpecs,
    differences,
    similarities,
}: CompareStatsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 print:hidden">
            <div className="p-4 bg-linear-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IoInformationCircle className="text-xl text-blue-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-blue-700">{totalSpecs}</p>
                        <p className="text-sm text-blue-600">Total Specs Compared</p>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-linear-to-br from-amber-50 to-white rounded-xl border border-amber-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <FaExclamationTriangle className="text-lg text-amber-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-amber-700">{differences}</p>
                        <p className="text-sm text-amber-600">Differences Found</p>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-linear-to-br from-green-50 to-white rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <IoCheckmark className="text-xl text-green-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-700">{similarities}</p>
                        <p className="text-sm text-green-600">Matching Specs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareStats;
