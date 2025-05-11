import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">Get In Touch</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-cream p-3 rounded-full mr-4">
            <MapPin className="h-6 w-6 text-burgundy" />
          </div>
          <div>
            <h4 className="font-semibold text-charcoal">Our Location</h4>
            <p className="text-gray-600 mt-1">
              123 Wedding Street, Dharampeth<br />
              Nagpur, Maharashtra 440010
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-cream p-3 rounded-full mr-4">
            <Phone className="h-6 w-6 text-burgundy" />
          </div>
          <div>
            <h4 className="font-semibold text-charcoal">Phone Number</h4>
            <p className="text-gray-600 mt-1">+91 98765 43210</p>
            <p className="text-gray-600">+91 91234 56789</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-cream p-3 rounded-full mr-4">
            <Mail className="h-6 w-6 text-burgundy" />
          </div>
          <div>
            <h4 className="font-semibold text-charcoal">Email Address</h4>
            <p className="text-gray-600 mt-1">info@nihalwanjari.com</p>
            <p className="text-gray-600">bookings@nihalwanjari.com</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-cream p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-burgundy" />
          </div>
          <div>
            <h4 className="font-semibold text-charcoal">Working Hours</h4>
            <p className="text-gray-600 mt-1">Monday - Saturday: 10:00 AM - 7:00 PM</p>
            <p className="text-gray-600">Sunday: By appointment only</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="font-semibold text-charcoal mb-3">Connect With Us</h4>
        <div className="flex space-x-3">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-cream hover:bg-gold/20 p-2 rounded-full transition-colors"
          >
            <svg className="h-5 w-5 text-burgundy" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-cream hover:bg-gold/20 p-2 rounded-full transition-colors"
          >
            <svg className="h-5 w-5 text-burgundy" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"></path>
            </svg>
          </a>
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-cream hover:bg-gold/20 p-2 rounded-full transition-colors"
          >
            <svg className="h-5 w-5 text-burgundy" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c0-5.445 4.436-9.884 9.896-9.884 2.645 0 5.13 1.03 7.006 2.904a9.87 9.87 0 0 1 2.891 7.019c-.004 5.444-4.436 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;