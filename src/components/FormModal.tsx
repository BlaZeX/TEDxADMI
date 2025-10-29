import React, { useState, useEffect, FormEvent } from 'react';
import { FormType } from '../types';
import { SPEAKERS } from '../constants';
import { submitToGoogleSheet } from '../services/formService';

interface FormModalProps {
  formType: FormType;
  onClose: () => void;
}

const InputField: React.FC<{ id: string, label: string, type?: string, required?: boolean }> = ({ id, label, type = "text", required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input type={type} name={id} id={id} required={required} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
  </div>
);

const TextAreaField: React.FC<{ id: string, label: string, required?: boolean }> = ({ id, label, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea id={id} name={id} rows={4} required={required} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
  </div>
);

const RatingField: React.FC<{ label: string, category: string, rating: number, onRate: (category: string, value: number) => void }> = ({ label, category, rating, onRate }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex space-x-1 mt-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(category, star)}
          className={`text-3xl transition-colors duration-200 ${star <= (rating || 0) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
          aria-label={`Rate ${star} out of 5`}
        >
          ★
        </button>
      ))}
    </div>
  </div>
);


const FormModal: React.FC<FormModalProps> = ({ formType, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setIsSubmitted(false);
    setRatings({});
    setIsSubmitting(false);
    setSubmitError(null);
    switch (formType) {
      case FormType.REGISTER:
        setTitle('Attendee Registration');
        break;
      case FormType.CONTACT:
        setTitle('Contact Us');
        break;
      case FormType.FEEDBACK:
        setTitle('Event Feedback');
        break;
      default:
        setTitle('');
    }
  }, [formType]);

  const handleRating = (category: string, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Add data that isn't from a standard input, for context in the spreadsheet
    data.formType = FormType[formType];
    data.ratings = JSON.stringify(ratings);

    try {
      await submitToGoogleSheet(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError("Sorry, there was an issue with your submission. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formType === FormType.NONE) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your submission has been received.</p>
              <button onClick={onClose} className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition duration-300">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formType === FormType.REGISTER && (
                <>
                  <InputField id="name" label="Full Name" />
                  <InputField id="email" label="Email Address" type="email" />
                  <InputField id="phone" label="Phone Number (Optional)" type="tel" required={false} />
                  <InputField id="organization" label="Organization / University" />
                   <div>
                    <label htmlFor="referral" className="block text-sm font-medium text-gray-700">How did you hear about us?</label>
                    <select id="referral" name="referral" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                      <option>Social Media</option>
                      <option>Friend or Colleague</option>
                      <option>University Announcement</option>
                      <option>Online Search</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="newsletter" name="newsletter" type="checkbox" className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" defaultChecked/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="font-medium text-gray-700">Subscribe to our newsletter for future events</label>
                    </div>
                  </div>
                </>
              )}
              {formType === FormType.CONTACT && (
                <>
                  <InputField id="name" label="Full Name" />
                  <InputField id="email" label="Email Address" type="email" />
                  <TextAreaField id="message" label="Your Message" />
                </>
              )}
              {formType === FormType.FEEDBACK && (
                <>
                  <InputField id="name" label="Full Name (Optional)" required={false} />
                  <RatingField label="Overall Experience" category="overall" rating={ratings.overall} onRate={handleRating} />
                  <RatingField label="Speakers & Content" category="speakers" rating={ratings.speakers} onRate={handleRating} />
                  <RatingField label="Venue & Organization" category="venue" rating={ratings.venue} onRate={handleRating} />
                   <div>
                    <label htmlFor="favoriteSpeaker" className="block text-sm font-medium text-gray-700">Who was your favorite speaker? (Optional)</label>
                    <select id="favoriteSpeaker" name="favoriteSpeaker" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                      <option value="">Select a speaker</option>
                      {SPEAKERS.map(speaker => (
                        <option key={speaker.name} value={speaker.name}>{speaker.name}</option>
                      ))}
                    </select>
                  </div>
                  <TextAreaField id="likes" label="What did you like most?" />
                  <TextAreaField id="improvements" label="Suggestions for improvement" />
                </>
              )}
              {submitError && <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{submitError}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed flex justify-center items-center">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      `}</style>
    </div>
  );
};

export default FormModal;