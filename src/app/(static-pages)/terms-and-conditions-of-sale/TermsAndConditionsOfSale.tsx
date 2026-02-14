import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { TermsAndConditionsOfSaleContent } from './_components/TermsAndConditionsOfSaleContent/TermsAndConditionsOfSaleContent';

const TermsAndConditionsOfSale = () => {
    return (
        <>
            <Container>
                <div className="flex w-full items-start">
                    <div className="w-full">
                        <Breadcrumb>
                            <Item href={`/`}>Home</Item>
                            <Item href={`/terms-and-conditions-of-sale`} isEnd={true}>
                                Terms and Conditions of Sale
                            </Item>
                        </Breadcrumb>
                    </div>
                </div>
            </Container>
            <TermsAndConditionsOfSaleContent />
        </>
    );
};

export default TermsAndConditionsOfSale;
