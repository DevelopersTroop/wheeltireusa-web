import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { CCPAOptOutContent } from './_components/CCPAOptOutContent/CCPAOptOutContent';

const CCPAOptOut = () => {
    return (
        <>
            <Container>
                <div className="flex w-full items-start">
                    <div className="w-full">
                        <Breadcrumb>
                            <Item href={`/`}>Home</Item>
                            <Item href={`/ccpa-opt-out`} isEnd={true}>
                                CCPA Opt-Out
                            </Item>
                        </Breadcrumb>
                    </div>
                </div>
            </Container>
            <CCPAOptOutContent />
        </>
    );
};

export default CCPAOptOut;
