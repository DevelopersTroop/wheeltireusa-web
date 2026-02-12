import { metaDataHelper } from '@/utils/metadata';
import ComparePage from './_components/ComparePage';

export const metadata = metaDataHelper({
    title: 'Compare Tires - Tirematic',
    keywords: 'tire comparison, compare tires, tire specs comparison',
    description:
        'Compare different tires side by side to find the best option for your vehicle. Compare specifications, prices, and features.',
    openGraph: {
        title: 'Compare Tires - Tirematic',
        description:
            'Compare different tires side by side to find the best option for your vehicle.',
        images: ['/images/header/TirematicLogo.png'],
    },
    alternates: {
        canonical: 'https://tirematic.com/compare',
    },
});

export default function ComparePageWrapper() {
    return <ComparePage />;
}
