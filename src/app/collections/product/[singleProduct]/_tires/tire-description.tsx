import { TInventoryItem } from '@/types/product';
import React, { useState } from 'react';

const TireDescription: React.FC<{ product: TInventoryItem }> = ({
  product,
}) => {
  const [activeTab, setActiveTab] = useState('Description');

  const renderContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <div className="space-y-6">
            <p>{product?.description}</p>

            <h2 className="font-semibold text-lg">
              Key Features Youll Appreciate:
            </h2>

            <div className="space-y-4">
              <Feature
                title="Confident Wet Performance"
                description="Four wide, deep grooves quickly move water away from the tread, helping reduce the risk of hydroplaning during rainy days."
              />
              <Feature
                title="Smooth, Quiet Rides"
                description="Advanced tread compounds help reduce road noise and vibrations, giving you a comfortable, peaceful drive."
              />
              <Feature
                title="Even, Long-Lasting Wear"
                description="Anti-wear shoulder belts ensure the tire wears evenly by distributing pressure more effectively during braking and turns."
              />
              <Feature
                title="All-Season Reliability"
                description="Whether its dry highways, wet roads, or chilly mornings, this tire is built to keep you in control."
              />
              <Feature
                title="Best suited for:"
                description="Passenger cars, daily drivers, and families looking for dependable, affordable performance."
              />
            </div>
          </div>
        );
      case 'Specifications':
        return <p className="text-gray-700">Hello Specifications</p>;
      case 'Reviews':
        return <p className="text-gray-700">This is the Reviews content.</p>;
      case 'Warranty information':
        return (
          <p className="text-gray-700">Warranty details will be shown here.</p>
        );
      case 'Sizes':
        return (
          <p className="text-gray-700">
            Available sizes for the tire will be listed here.
          </p>
        );
      default:
        return null;
    }
  };

  const tabs = [
    'Description',
    'Specifications',
    'Reviews',
    'Warranty information',
    'Sizes',
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-[#F7F7F7]">
      <div className="border-b border-gray-300 mb-4">
        <div className="flex space-x-6 text-sm font-medium text-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => (
  <div className="p-4 bg-white rounded">
    <h3 className="font-semibold text-base">{title}</h3>
    <p className="text-base font-normal mt-1">{description}</p>
  </div>
);

export default TireDescription;
