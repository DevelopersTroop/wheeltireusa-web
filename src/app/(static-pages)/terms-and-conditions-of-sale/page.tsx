import { metaDataHelper } from '@/utils/metadata';
import TermsAndConditionsOfSale from './TermsAndConditionsOfSale';

export const metadata = metaDataHelper({
    title: 'Terms and Conditions of Sale - WheelTireUSA',
    keywords: '',
    description: '',
    openGraph: {
        title: '',
        description: '',
    },
    alternates: {
        canonical: 'https://wheeltireusa.com/terms-and-conditions-of-sale',
    },
});

export default function Page() {
    return (
        <TermsAndConditionsOfSale />
    );
}
