import React, { useState, useEffect } from 'react';
import { FormType } from './types';
import { SPEAKERS, SCHEDULE, EVENT_DATE, EVENT_THEME, EVENT_VENUE } from './constants';
import FormModal from './components/FormModal';
import Partners from './components/Partners';

// SVG Icon Components
const MenuIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);

const CloseIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
);

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
);

// Header Component
const Header: React.FC<{ onFormOpen: (form: FormType) => void }> = ({ onFormOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#speakers', label: 'Speakers' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#partners', label: 'Partners' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className={`font-black text-2xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
          TEDx<span className="text-red-600">ADMI</span>
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => link.label === 'Contact' && onFormOpen(FormType.CONTACT)} className={`font-bold ${isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-300'} transition-colors`}>{link.label}</a>
          ))}
          <button onClick={() => onFormOpen(FormType.REGISTER)} className="bg-red-600 text-white font-bold py-2 px-5 rounded-md hover:bg-red-700 transition duration-300">Register Now</button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={isScrolled ? 'text-gray-900' : 'text-white'}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white text-gray-900">
          <div className="px-6 pb-4 flex flex-col space-y-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => { setIsOpen(false); if(link.label === 'Contact') onFormOpen(FormType.CONTACT); }} className="font-bold hover:text-red-600">{link.label}</a>
            ))}
            <button onClick={() => { setIsOpen(false); onFormOpen(FormType.REGISTER); }} className="w-full bg-red-600 text-white font-bold py-3 px-5 rounded-md hover:bg-red-700 transition duration-300">Register Now</button>
          </div>
        </div>
      )}
    </header>
  );
};

// Hero Component
const Hero: React.FC<{ onFormOpen: (form: FormType) => void }> = ({ onFormOpen }) => (
  <section className="relative h-screen flex items-center justify-center text-white text-center bg-gray-900">
    <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://picsum.photos/id/10/1920/1080')` }}></div>
    <div className="relative z-10 p-6">
      <h1 className="text-5xl md:text-7xl font-black mb-4"><span className="text-red-600">TEDx</span>ADMI</h1>
      <p className="text-2xl md:text-4xl font-bold mb-6 tracking-wide">{EVENT_THEME}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-lg mb-8">
        <span className="flex items-center"><CalendarIcon /> {EVENT_DATE}</span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center"><LocationIcon /> {EVENT_VENUE}</span>
      </div>
      <button onClick={() => onFormOpen(FormType.REGISTER)} className="bg-red-600 text-white font-bold py-4 px-10 text-lg rounded-md hover:bg-red-700 transition duration-300 transform hover:scale-105">
        Register Now
      </button>
    </div>
  </section>
);

// Section Component
const Section: React.FC<{ id: string, title: string, children: React.ReactNode, bg?: string }> = ({ id, title, children, bg = 'bg-white' }) => (
    <section id={id} className={`py-20 ${bg}`}>
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-black text-center mb-12">{title}</h2>
            {children}
        </div>
    </section>
);


// App Component
const App: React.FC = () => {
  const [activeForm, setActiveForm] = useState<FormType>(FormType.NONE);

  return (
    <div className="relative">
      <Header onFormOpen={setActiveForm} />
      <main>
        <Hero onFormOpen={setActiveForm} />

        <Section id="about" title="About TEDxADMI">
          <div className="max-w-4xl mx-auto text-center text-lg text-gray-700 space-y-4">
            <p>In the spirit of ideas worth spreading, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxADMI, where x = independently organized TED event.</p>
            <p>This year, at <span className="font-bold">TEDxADMI</span>, our theme is <span className="font-bold text-red-600">"Genesis"</span>. We are delving into the origins of ideas, the dawn of new technologies, and the very beginnings of movements that shape our world. We're bringing together brilliant minds to share ideas that explore the power of a new start.</p>
          </div>
        </Section>

        <Section id="speakers" title="Our Speakers" bg="bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SPEAKERS.map((speaker, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <img src={speaker.imageUrl} alt={speaker.name} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{speaker.name}</h3>
                  <p className="text-red-600 font-semibold mb-2">{speaker.title}</p>
                  <p className="text-gray-600 text-sm">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
        
        <Section id="schedule" title="Event Schedule">
            <div className="max-w-4xl mx-auto">
                {SCHEDULE.map((item, index) => (
                    <div key={index} className="flex items-start my-8">
                        <div className="w-28 text-right pr-8">
                            <p className="font-bold text-red-600 text-lg">{item.time}</p>
                        </div>
                        <div className="flex-1 pl-8 border-l-2 border-red-200">
                            <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        <Partners onFormOpen={setActiveForm}/>

      </main>
      
      <footer id="contact" className="bg-gray-900 text-white pt-10 pb-6">
        <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-black mb-4">TEDx<span className="text-red-600">ADMI</span></h3>
            <p className="mb-6">This independent TEDx event is operated under license from TED.</p>
            <div className="flex justify-center space-x-6 mb-6">
                <button onClick={() => setActiveForm(FormType.CONTACT)} className="font-bold hover:text-red-500 transition">Contact Us</button>
                <button onClick={() => setActiveForm(FormType.FEEDBACK)} className="font-bold hover:text-red-500 transition">Event Feedback</button>
            </div>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} TEDxADMI. All Rights Reserved.</p>
        </div>
      </footer>

      <FormModal formType={activeForm} onClose={() => setActiveForm(FormType.NONE)} />
    </div>
  );
}

export default App;