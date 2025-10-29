
import React, { useState, FormEvent } from 'react';
import { generateTedxIdea } from '../services/geminiService';

const IdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [idea, setIdea] = useState<{ title: string; abstract: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIdea(null);

    try {
      const result = await generateTedxIdea(topic);
      setIdea(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="idea-generator" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-4">Have an Idea Worth Spreading?</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Use our AI-powered idea generator to craft the perfect title and abstract for your talk.
        </p>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic, e.g., 'The Future of Cities'"
              className="flex-grow w-full px-4 py-3 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition duration-300 disabled:bg-red-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                'Generate'
              )}
            </button>
          </div>
        </form>
        
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {idea && (
          <div className="mt-10 p-8 bg-gray-800 rounded-lg text-left max-w-2xl mx-auto animate-fade-in">
            <h3 className="text-2xl font-bold text-red-500 mb-3">{idea.title}</h3>
            <p className="text-gray-300">{idea.abstract}</p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default IdeaGenerator;
