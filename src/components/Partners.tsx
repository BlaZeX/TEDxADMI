import React from 'react';
import { FormType } from '../types';

interface PartnersProps {
  onFormOpen: (form: FormType) => void;
}

// Placeholder logos. In a real project, these would be actual sponsor logos.
const partnerLogos = [
  { name: "Innovate Corp", imageUrl: "https://logoipsum.com/logo/logo-280.svg" },
  { name: "Future Systems", imageUrl: "https://logoipsum.com/logo/logo-284.svg" },
  { name: "QuantumLeap", imageUrl: "https://logoipsum.com/logo/logo-286.svg" },
  { name: "Echo Solutions", imageUrl: "https://logoipsum.com/logo/logo-293.svg" },
  { name: "Nexus Tech", imageUrl: "https://logoipsum.com/logo/logo-294.svg" },
  { name: "Apex Dynamics", imageUrl: "https://logoipsum.com/logo/logo-295.svg" },
];

const Partners: React.FC<PartnersProps> = ({ onFormOpen }) => {
  return (
    <section id="partners" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-4">Our Valued Partners</h2>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          This event is made possible by the generous support of our partners who believe in the power of ideas.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 items-center max-w-5xl mx-auto">
          {partnerLogos.map((partner) => (
            <div key={partner.name} className="flex justify-center" title={partner.name}>
              <img
                src={partner.imageUrl}
                alt={`${partner.name} logo`}
                className="h-10 w-auto transition-transform duration-300 transform filter grayscale hover:grayscale-0 hover:scale-110"
                style={{'filter': 'brightness(0) invert(1)'}}
              />
            </div>
          ))}
        </div>
        <div className="mt-16">
          <button
            onClick={() => onFormOpen(FormType.CONTACT)}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition duration-300"
          >
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;