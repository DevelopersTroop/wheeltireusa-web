import Container from '@/components/ui/container/container';

export const TermsAndConditionsOfSaleContent = () => {
    return (
        <Container>
            <div className="flex flex-col gap-8 items-start justify-center w-full mt-10 mb-10 md:mb-20">
                <div className="flex flex-col gap-4 items-start justify-center w-full">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">2️⃣</span>
                        <h2 className="text-4xl font-bold text-btext uppercase">Terms and Conditions of Sale</h2>
                    </div>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">1. Order Acceptance</h3>
                        <div className="space-y-4 text-black">
                            <p>These Terms govern all purchases made through WheelTireUSA.</p>
                            <p>Your order constitutes an offer to purchase. We may refuse or cancel orders due to:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Pricing errors</li>
                                <li>Product availability</li>
                                <li>Suspected fraud</li>
                                <li>Incorrect vehicle information</li>
                            </ul>
                            <p>Orders are accepted only upon shipment.</p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">2. Pricing</h3>
                        <div className="space-y-4 text-black">
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Prices are subject to change without notice.</li>
                                <li>Taxes and shipping charges are calculated at checkout.</li>
                                <li>We reserve the right to correct pricing errors.</li>
                            </ul>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">3. Payment</h3>
                        <div className="space-y-4 text-black">
                            <p>We accept major credit cards and approved financing/payment providers listed at checkout.</p>
                            <p>You represent that you are authorized to use the payment method submitted.</p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">4. Shipping & Risk of Loss</h3>
                        <div className="space-y-4 text-black">
                            <p>Title and risk of loss transfer to you when the product is delivered to the carrier.</p>
                            <p>Delivery dates are estimates only.</p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">5. Returns & Refunds</h3>
                        <div className="space-y-4 text-black">
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Returns must be requested within 30 days of delivery.</li>
                                <li>Products must be new, unused, and in original packaging.</li>
                                <li>Mounted, installed, or driven-on products are non-returnable.</li>
                                <li>Custom-built or made-to-order wheels are non-cancellable and non-returnable.</li>
                                <li>Clearance items are final sale.</li>
                            </ul>
                            <p>Return Authorization (RA) approval is required prior to return.</p>
                            <p>Restocking fees may apply depending on brand.</p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">6. Warranty Disclaimer</h3>
                        <div className="space-y-4 text-black">
                            <p>Products are covered by manufacturer warranties only.</p>
                            <p>
                                WheelTireUSA provides no independent warranties and sells products “AS IS” except where
                                prohibited by law.
                            </p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">7. Limitation of Liability</h3>
                        <div className="space-y-4 text-black">
                            <p>Our total liability shall not exceed the amount paid for the product in dispute.</p>
                            <p>We are not liable for indirect, incidental, or consequential damages.</p>
                        </div>
                        <hr className="my-8 border-gray-300" />
                    </section>

                    <section className="w-full">
                        <h3 className="text-2xl font-bold text-btext mb-4">8. Dispute Resolution</h3>
                        <div className="space-y-4 text-black">
                            <p>All disputes shall be resolved through binding arbitration on an individual basis.</p>
                            <p>Class actions and jury trials are waived.</p>
                        </div>
                    </section>
                </div>
            </div>
        </Container>
    );
};
