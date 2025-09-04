import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Full-Stack Developer',
    company: 'TechCorp',
    quote: 'This platform saved us weeks of debugging. The automated fixes are incredibly accurate and the security patches give us peace of mind.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'DevOps Engineer',
    company: 'StartupXYZ',
    quote: 'Gone are the days of dependency hell. The cloud environments are fast, secure, and just work. Game changer for our team.',
    rating: 5
  },
  {
    name: 'Emily Watson',
    role: 'Tech Lead',
    company: 'InnovateLabs',
    quote: 'The AI-powered bug detection caught issues we would have never found manually. Production deployments are now stress-free.',
    rating: 5
  }
];

const logos = [
  'TechCorp', 'StartupXYZ', 'InnovateLabs', 'DevTeam Pro', 'CloudFirst', 'CodeCraft'
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Developers</span>
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of developers who've transformed their workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300">
              <Quote className="w-8 h-8 text-green-400 mb-4" />
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
              
              <div className="flex items-center gap-2 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-gray-400">{testimonial.role}</p>
                <p className="text-green-400 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-16">
          <p className="text-center text-gray-500 mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {logos.map((logo, index) => (
              <div key={index} className="text-gray-600 font-semibold text-lg hover:text-gray-400 transition-colors cursor-pointer">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;