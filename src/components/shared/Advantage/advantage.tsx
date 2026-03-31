import { ReactNode } from "react";

interface AdvantageItem {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
}

interface EliteAdvantageProps {
  items: AdvantageItem[];
}

const EliteAdvantage = ({ items }: EliteAdvantageProps) => {
  return (
    <div className="mt-10 sm:mt-12 md:mt-16">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
           Advantage
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mt-3 sm:mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg ${item.bgColor} ${item.color} shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide mb-1.5 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EliteAdvantage;
