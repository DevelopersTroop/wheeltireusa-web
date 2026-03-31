import { ReactNode } from "react";

interface WhyChooseEliteProps {
  paragraphs: string[];
}

const WhyChooseElite = ({ paragraphs }: WhyChooseEliteProps) => {
  return (
    <div className="mt-10 sm:mt-12 md:mt-16">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 sm:p-8 md:p-12 border border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide text-center mb-4 sm:mb-6">
            Why Choose WheelTire USA
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-5 sm:mb-6 md:mb-8" />

          <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseElite;
