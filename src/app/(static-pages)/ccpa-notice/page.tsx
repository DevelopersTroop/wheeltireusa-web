import { metaDataHelper } from '@/utils/metadata';
import CCPANotice from './CCPANotice';

export const metadata = metaDataHelper({
    title: 'CCPA Notice - WheelTireUSA',
    keywords: '',
    description: '',
    openGraph: {
        title: '',
        description: '',
    },
    alternates: {
        canonical: 'https://wheeltireusa.com/ccpa-notice',
    },
});

export default function Page() {
    return (
        <CCPANotice />
    );
}
