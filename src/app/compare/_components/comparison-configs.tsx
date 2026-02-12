import { TTireProduct, TWheelProduct, TInventoryItem } from '@/types/product';
import { IoInformationCircle } from 'react-icons/io5';
import { BsSpeedometer } from 'react-icons/bs';
import { TbRulerMeasure } from 'react-icons/tb';
import { GiTireTracks, GiWeight } from 'react-icons/gi';
import { HiLightningBolt } from 'react-icons/hi';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { FaShoppingCart, FaPalette, FaTools } from 'react-icons/fa';

export type ViewMode = 'all' | 'differences' | 'similarities';

export type SpecCategory = {
    name: string;
    icon: React.ReactNode;
    specs: {
        key: string;
        label: string;
        unit?: string;
        tooltip?: string;
        format?: 'boolean' | 'string';
    }[];
};

export const tireComparisonCategories: SpecCategory[] = [
    {
        name: 'Basic Information',
        icon: <IoInformationCircle className="text-lg" />,
        specs: [
            { key: 'brand', label: 'Brand' },
            { key: 'model', label: 'Model' },
            { key: 'tireSize', label: 'Tire Size' },
            { key: 'rawSize', label: 'Raw Size' },
            { key: 'partNumber', label: 'Part Number' },
            { key: 'gtin', label: 'GTIN/UPC' },
            { key: 'vehicleCategory', label: 'Vehicle Category' },
            { key: 'tireClass', label: 'Tire Class' },
            { key: 'vendorName', label: 'Vendor' },
        ],
    },
    {
        name: 'Tire Specifications',
        icon: <BsSpeedometer className="text-lg" />,
        specs: [
            { key: 'tireWidth', label: 'Tire Width' },
            { key: 'tireRatio', label: 'Tire Ratio' },
            { key: 'tireDiameter', label: 'Tire Diameter' },
            { key: 'speedRating', label: 'Speed Rating' },
            { key: 'loadIndex', label: 'Load Index' },
            { key: 'loadRating', label: 'Load Rating' },
            { key: 'utqg', label: 'UTQG Rating' },
            { key: 'ply', label: 'Ply Rating' },
        ],
    },
    {
        name: 'Dimensions',
        icon: <TbRulerMeasure className="text-lg" />,
        specs: [
            { key: 'overallDiameterIn', label: 'Overall Diameter', unit: 'in' },
            { key: 'overallDiameterMm', label: 'Overall Diameter', unit: 'mm' },
            { key: 'sectionWidthIn', label: 'Section Width', unit: 'in' },
            { key: 'sectionWidthMm', label: 'Section Width', unit: 'mm' },
            { key: 'stdRim', label: 'Standard Rim' },
            { key: 'staticLoadRadiusIn', label: 'Static Load Radius', unit: 'in' },
            { key: 'staticLoadRadiusMm', label: 'Static Load Radius', unit: 'mm' },
        ],
    },
    {
        name: 'Tread & Pattern',
        icon: <GiTireTracks className="text-lg" />,
        specs: [
            { key: 'treadDepthIn', label: 'Tread Depth', unit: '32nds in' },
            { key: 'treadDepthMm', label: 'Tread Depth', unit: 'mm' },
            { key: 'sidewall', label: 'Sidewall Style' },
            { key: 'approvedRimContours', label: 'Approved Rim Contours' },
        ],
    },
    {
        name: 'Load & Pressure',
        icon: <GiWeight className="text-lg" />,
        specs: [
            { key: 'maxLoadLbs', label: 'Max Load', unit: 'lbs' },
            { key: 'maxLoadKg', label: 'Max Load', unit: 'kg' },
            { key: 'maxAirPressurePsi', label: 'Max Air Pressure', unit: 'PSI' },
            { key: 'maxAirPressureKpa', label: 'Max Air Pressure', unit: 'kPa' },
        ],
    },
    {
        name: 'Features',
        icon: <HiLightningBolt className="text-lg" />,
        specs: [
            { key: 'runFlat', label: 'Run Flat', format: 'boolean' },
        ],
    },
    {
        name: 'Shipping',
        icon: <MdOutlineLocalShipping className="text-lg" />,
        specs: [
            { key: 'shipWeight', label: 'Weight' },
            { key: 'shipWidth', label: 'Width' },
            { key: 'shipHeight', label: 'Height' },
            { key: 'shipDepth', label: 'Depth' },
        ],
    },
    {
        name: 'Pricing & Inventory',
        icon: <FaShoppingCart className="text-lg" />,
        specs: [
            { key: 'sellingPrice', label: 'Selling Price', unit: '$' },
            { key: 'availableStock', label: 'Available Stock' },
        ],
    },
];

export const wheelComparisonCategories: SpecCategory[] = [
    {
        name: 'Basic Information',
        icon: <IoInformationCircle className="text-lg" />,
        specs: [
            { key: 'brand', label: 'Brand' },
            { key: 'model', label: 'Model' },
            { key: 'wheelSize', label: 'Wheel Size' },
            { key: 'partNumber', label: 'Part Number' },
            { key: 'gtin', label: 'GTIN/UPC' },
            { key: 'vendorName', label: 'Vendor' },
        ],
    },
    {
        name: 'Wheel Dimensions',
        icon: <TbRulerMeasure className="text-lg" />,
        specs: [
            { key: 'wheelDiameter', label: 'Diameter', unit: 'in' },
            { key: 'wheelWidth', label: 'Width', unit: 'in' },
            { key: 'offset', label: 'Offset', unit: 'mm' },
            { key: 'backspacing', label: 'Backspacing', unit: 'in' },
            { key: 'centerbore', label: 'Center Bore', unit: 'mm' },
            { key: 'lipSize', label: 'Lip Size' },
        ],
    },
    {
        name: 'Bolt Pattern',
        icon: <FaTools className="text-lg" />,
        specs: [
            { key: 'boltPattern1', label: 'Bolt Pattern 1' },
            { key: 'boltPattern2', label: 'Bolt Pattern 2' },
            { key: 'blankBoltPatterns', label: 'Blank Pattern' },
        ],
    },
    {
        name: 'Finish & Style',
        icon: <FaPalette className="text-lg" />,
        specs: [
            { key: 'finish', label: 'Finish' },
            { key: 'finishType', label: 'Finish Type' },
            { key: 'style', label: 'Style' },
            { key: 'designType', label: 'Design' },
        ],
    },
    {
        name: 'Load & Build',
        icon: <GiWeight className="text-lg" />,
        specs: [
            { key: 'loadRating', label: 'Load Rating' },
            { key: 'maxLoadLbs', label: 'Max Load', unit: 'lbs' },
            { key: 'maxLoadKg', label: 'Max Load', unit: 'kg' },
            { key: 'forgingStyle', label: 'Forging Style' },
            { key: 'dually', label: 'Dually', format: 'boolean' },
        ],
    },
    {
        name: 'Shipping',
        icon: <MdOutlineLocalShipping className="text-lg" />,
        specs: [
            { key: 'shipWeight', label: 'Weight' },
            { key: 'shipWidth', label: 'Width' },
            { key: 'shipHeight', label: 'Height' },
            { key: 'shipDepth', label: 'Depth' },
        ],
    },
    {
        name: 'Pricing & Inventory',
        icon: <FaShoppingCart className="text-lg" />,
        specs: [
            { key: 'sellingPrice', label: 'Selling Price', unit: '$' },
            { key: 'availableStock', label: 'Available Stock' },
        ],
    },
];

export const getSpecValue = (product: TInventoryItem, key: string): string | null => {
    if (key === 'category') return product.category?.title ?? null;
    const value = product[key as keyof TInventoryItem];
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'number') {
        if (key.toLowerCase().includes('price')) {
            return value.toFixed(2);
        }
        return value.toString();
    }
    if (typeof value === 'object') return null;
    return String(value);
};

export const checkDifference = (products: TInventoryItem[], key: string): boolean => {
    if (products.length < 2) return false;
    const values = products.map((p) => getSpecValue(p, key));
    const nonNullValues = values.filter((v) => v !== null);
    if (nonNullValues.length < 2) return false;
    return nonNullValues.some((v) => v !== nonNullValues[0]);
};

export const checkSimilarity = (products: TInventoryItem[], key: string): boolean => {
    if (products.length < 2) return false;
    const values = products.map((p) => getSpecValue(p, key));
    const nonNullValues = values.filter((v) => v !== null);
    if (nonNullValues.length < 2) return false;
    return nonNullValues.every((v) => v === nonNullValues[0]);
};
