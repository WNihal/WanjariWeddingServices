import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg" 
                alt="Nihal Wanjari" 
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                <span className="text-burgundy font-serif font-bold text-lg">10+ Years</span>
                <p className="text-gray-600 text-sm">Of Excellence</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              About Nihal Wanjari Wedding Services
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded in 2012, we are Nagpur's premier wedding service provider, dedicated to creating unforgettable wedding experiences. We understand that your wedding day is one of the most significant events in your life, and we take pride in making it perfect.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our team of experienced professionals handle every aspect of your wedding with meticulous attention to detail, ensuring that your special day is exactly as you envisioned it.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-charcoal">Experienced Team</h3>
                  <p className="text-gray-600 text-sm">Professional staff with years of experience</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-charcoal">Personalized Service</h3>
                  <p className="text-gray-600 text-sm">Customized solutions for your unique needs</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-charcoal">Affordable Packages</h3>
                  <p className="text-gray-600 text-sm">Quality services at competitive prices</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-charcoal">End-to-End Solution</h3>
                  <p className="text-gray-600 text-sm">One-stop shop for all wedding needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;