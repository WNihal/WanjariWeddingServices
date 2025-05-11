import React, { useEffect, useState } from 'react';

const bannerSlides = [
  {
    id: 1,
    imageUrl: 'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg',
    title: 'Creating Unforgettable Wedding Experiences',
    subtitle: 'Premium Wedding Services in Nagpur',
  },
  {
    id: 2,
    imageUrl: 'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg',
    title: 'Turning Dreams Into Beautiful Memories',
    subtitle: 'Catering, Decoration, Photography & More',
  },
  {
    id: 3,
    imageUrl: 'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg',
    title: 'Elegant Weddings, Expertly Managed',
    subtitle: 'Customized Services For Your Special Day',
  },
];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-6 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gold mt-4">
                {slide.subtitle}
              </p>
              <div className="mt-8">
                <a
                  href="#services"
                  className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-3 rounded font-medium text-lg transition-colors mx-2"
                >
                  Our Services
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white hover:border-gold hover:text-gold text-white px-8 py-3 rounded font-medium text-lg transition-colors mx-2"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-gold w-8' : 'bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;