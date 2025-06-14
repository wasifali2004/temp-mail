"use client"
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "Digital Marketing Specialist",
      company: "TechFlow Agency",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Perfect for signing up to services without spam! I use it daily for client research and testing. Clean interface and instant email delivery.",
      rating: 5,
      featured: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Software Developer",
      company: "CodeCraft Solutions",
      image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "As a developer, I need temporary emails for testing user flows. This service is reliable, fast, and saves me tons of time.",
      rating: 5,
      featured: false
    },
    {
      id: 3,
      name: "Michael Thompson",
      role: "Privacy Consultant",
      company: "SecureWeb Co",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Excellent privacy protection! No registration needed and emails auto-delete. It&apos;s become essential for my online privacy toolkit.",
      rating: 5,
      featured: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "E-commerce Manager",
      company: "ShopSmart Ltd",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Great for testing checkout flows and email campaigns. The emails arrive instantly and the interface is super user-friendly.",
      rating: 5,
      featured: false
    },
    {
      id: 5,
      name: "David Park",
      role: "Freelance Designer",
      company: "Creative Studio",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "No more cluttered inbox! I use this for all one-time signups and downloads. Simple, effective, and completely free.",
      rating: 5,
      featured: true
    },
    {
      id: 6,
      name: "Lisa Martinez",
      role: "QA Engineer",
      company: "TestPro Systems",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      content: "Perfect for testing email functionality in our apps. Multiple domains available and emails load instantly. Highly recommended!",
      rating: 5,
      featured: false
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 150);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-all duration-300 ${
          i < rating ? 'text-yellow-400 fill-current scale-110' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-purple-600 via-blue-300 to-indigo-500 relative overflow-hidden"
      id="testimonials"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-300/20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-300/15 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
            <Quote className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            See what developers, marketers, and privacy-conscious users say about our temporary email service.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className={`relative transition-all duration-1000 delay-300 transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className={`relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 overflow-hidden transition-all duration-300 transform ${
              isTransitioning 
                ? 'scale-95 opacity-80' 
                : 'scale-100 opacity-100 hover:scale-[1.02] hover:shadow-3xl'
            }`}>
              {/* Animated decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 animate-bounce"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
              
              {/* Floating Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 animate-pulse">
                <Quote className="w-20 h-20 text-blue-600" />
              </div>
              
              {/* Content */}
              <div className={`relative z-10 transition-all duration-300 ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
                {/* Rating */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex space-x-1 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 text-center mb-10 leading-relaxed">
                  <span className="text-4xl text-blue-500 font-serif leading-none">&ldquo;</span>
                  {testimonials[currentIndex].content}
                  <span className="text-4xl text-blue-500 font-serif leading-none">&rdquo;</span>
                </blockquote>
                
                {/* Author Info */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="relative w-20 h-20 rounded-full object-cover shadow-xl transform group-hover:scale-105 transition-all duration-300"
                    />
                    {testimonials[currentIndex].featured && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonials[currentIndex].name}</h4>
                    <p className="text-blue-600 font-semibold text-lg">{testimonials[currentIndex].role}</p>
                    <p className="text-gray-600">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center justify-center mt-12 space-x-6">
            <button
              onClick={prevTestimonial}
              className="group p-4 rounded-full bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border border-white/30 hover:bg-white/30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors transform group-hover:scale-110" />
            </button>
            
            {/* Enhanced Dots */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 transform hover:scale-125 ${
                    index === currentIndex
                      ? 'w-12 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg'
                      : 'w-4 h-4 bg-white/40 hover:bg-white/60 rounded-full'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="group p-4 rounded-full bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border border-white/30 hover:bg-white/30"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors transform group-hover:scale-110" />
            </button>
          </div>
          
          {/* Auto-play indicator */}
          <div className="flex items-center justify-center mt-6">
            <div className={`text-sm text-white/70 flex items-center space-x-2 transition-opacity duration-300 ${
              isAutoPlaying ? 'opacity-100' : 'opacity-50'
            }`}>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <span>Auto-playing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}