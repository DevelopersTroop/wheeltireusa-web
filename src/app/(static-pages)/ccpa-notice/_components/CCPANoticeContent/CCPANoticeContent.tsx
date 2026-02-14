import Container from '@/components/ui/container/container';

export const CCPANoticeContent = () => {
    return (
        <Container>
            <div className="flex flex-col gap-8 items-start justify-center w-full mt-10 mb-10 md:mb-20">
                <div className="flex flex-col gap-4 items-start justify-center w-full">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">4️⃣</span>
                        <h2 className="text-4xl font-bold text-btext uppercase">CALIFORNIA CONSUMER PRIVACY ACT (CCPA) NOTICE</h2>
                    </div>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">For California Residents</h3>
                        <div className="space-y-4 text-black">
                            <p>Under the California Consumer Privacy Act (CCPA), California residents have the right to:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Know what personal information we collect</li>
                                <li>Request deletion of personal information</li>
                                <li>Opt out of the sale or sharing of personal information</li>
                                <li>Non-discrimination for exercising privacy rights</li>
                            </ul>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">Categories of Data Collected</h3>
                        <div className="space-y-4 text-black">
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Identifiers (name, address, IP address)</li>
                                <li>Commercial information (purchase history)</li>
                                <li>Internet activity</li>
                                <li>Geolocation data (approximate)</li>
                            </ul>
                            <p>We do not sell personal information for monetary compensation.</p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">Exercising Your Rights</h3>
                        <div className="space-y-4 text-black">
                            <p>To request access or deletion:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Email: <span className="font-semibold text-primary">privacy@wheeltireusa.com</span></li>
                                <li>Phone: <span className="font-semibold text-primary">+1(813)812-5257</span></li>
                            </ul>
                            <p>We may verify your identity before processing requests.</p>
                        </div>
                    </section>
                </div>
            </div>
        </Container>
    );
};
