import Container from '@/components/ui/container/container';

export const CCPAOptOutContent = () => {
    return (
        <Container>
            <div className="flex flex-col gap-8 items-start justify-center w-full mt-10 mb-10 md:mb-20">
                <div className="flex flex-col gap-4 items-start justify-center w-full">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">5️⃣</span>
                        <h2 className="text-4xl font-bold text-btext uppercase">CCPA OPT-OUT PAGE</h2>
                    </div>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">Do Not Sell or Share My Personal Information</h3>
                        <div className="space-y-4 text-black">
                            <p>WheelTireUSA respects your privacy choices.</p>
                            <p>
                                If you are a California resident and would like to opt out of the sale or sharing of your personal
                                information for cross-context behavioral advertising, you may submit a request below.
                            </p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">How to Opt Out</h3>
                        <div className="space-y-4 text-black">
                            <p>Email us at:</p>
                            <p className="font-semibold text-primary">privacy@wheeltireusa.com</p>
                            <p>Include:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Your full name</li>
                                <li>Email address used on our Site</li>
                                <li>State of residence</li>
                                <li>“CCPA Opt-Out Request” in the subject line</li>
                            </ul>
                            <hr className="my-8 border-gray-300" />
                            <p>We will confirm receipt and process your request within the timeframe required by law.</p>
                            <p>You will not be discriminated against for exercising your privacy rights.</p>
                        </div>
                    </section>
                </div>
            </div>
        </Container>
    );
};
