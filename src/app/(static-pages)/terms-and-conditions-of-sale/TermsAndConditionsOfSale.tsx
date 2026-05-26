import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { TermsAndConditionsOfSaleContent } from './_components/TermsAndConditionsOfSaleContent/TermsAndConditionsOfSaleContent';
import TermsAndConditionsOfSaleHero from './_components/TermsAndConditionsOfSaleHero/TermsAndConditionsOfSaleHero';

const TermsAndConditionsOfSale = () => {
    return (
        <>
           <TermsAndConditionsOfSaleHero />
            <TermsAndConditionsOfSaleContent />
        </>
    );
};

export default TermsAndConditionsOfSale;
