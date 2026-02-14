import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { CCPANoticeContent } from './_components/CCPANoticeContent/CCPANoticeContent';

const CCPANotice = () => {
    return (
        <>
            <Container>
                <div className="flex w-full items-start">
                    <div className="w-full">
                        <Breadcrumb>
                            <Item href={`/`}>Home</Item>
                            <Item href={`/ccpa-notice`} isEnd={true}>
                                CCPA Notice
                            </Item>
                        </Breadcrumb>
                    </div>
                </div>
            </Container>
            <CCPANoticeContent />
        </>
    );
};

export default CCPANotice;
