import { metaDataHelper } from '@/utils/metadata';
import CCPAOptOut from './CCPAOptOut';

export const metadata = metaDataHelper({
    title: 'CCPA Opt-Out - WheelTireUSA',
    keywords: '',
    description: '',
    openGraph: {
        title: '',
        description: '',
    },
    alternates: {
        canonical: 'https://wheeltireusa.com/ccpa-opt-out',
    },
});

export default function Page() {
    return (
        <CCPAOptOut />
    );
}
