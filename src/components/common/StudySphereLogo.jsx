import React from 'react';

const StudySphereLogo = ({ size = 48, className = "", variant = "full" }) => {
  const logoSize = size;
  
  if (variant === "icon") {
    return (
      <svg 
        width={logoSize} 
        height={logoSize} 
        viewBox="0 0 100 100" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring with Gradient */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#outerGradient)" 
          stroke="url(#outerStroke)" 
          strokeWidth="3"
        />
        
        {/* Inner Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="35" 
          fill="url(#innerGradient)" 
          stroke="#ffffff" 
          strokeWidth="2"
        />
        
        {/* Central Globe with 3D effect */}
        <circle 
          cx="50" 
          cy="50" 
          r="20" 
          fill="url(#globeGradient)" 
          stroke="#ffffff" 
          strokeWidth="1.5"
        />
        
        {/* Globe Lines - More detailed */}
        <path 
          d="M 30 50 Q 50 35 70 50" 
          stroke="#ffffff" 
          strokeWidth="2" 
          fill="none"
          opacity="0.9"
        />
        <path 
          d="M 30 50 Q 50 65 70 50" 
          stroke="#ffffff" 
          strokeWidth="2" 
          fill="none"
          opacity="0.9"
        />
        <line 
          x1="50" 
          y1="30" 
          x2="50" 
          y2="70" 
          stroke="#ffffff" 
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Additional decorative lines */}
        <path 
          d="M 30 50 Q 50 40 70 50" 
          stroke="#ffffff" 
          strokeWidth="1" 
          fill="none"
          opacity="0.6"
        />
        <path 
          d="M 30 50 Q 50 60 70 50" 
          stroke="#ffffff" 
          strokeWidth="1" 
          fill="none"
          opacity="0.6"
        />
        
        {/* Enhanced Stars with glow effect */}
        <g fill="#ffffff" opacity="0.9">
          <circle cx="20" cy="20" r="2.5" />
          <circle cx="80" cy="25" r="2" />
          <circle cx="15" cy="80" r="2" />
          <circle cx="85" cy="75" r="2.5" />
          <circle cx="25" cy="15" r="1.5" />
          <circle cx="75" cy="85" r="1.5" />
        </g>
        
        {/* Sparkle effects */}
        <g fill="#ffffff" opacity="0.7">
          <circle cx="35" cy="25" r="1" />
          <circle cx="65" cy="75" r="1" />
          <circle cx="25" cy="60" r="1" />
          <circle cx="75" cy="40" r="1" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="30%" stopColor="#1d4ed8" />
            <stop offset="70%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="outerStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="50%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Enhanced Logo Icon */}
      <svg 
        width={logoSize} 
        height={logoSize} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Outer Ring with Enhanced Gradient */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#outerGradient)" 
          stroke="url(#outerStroke)" 
          strokeWidth="3"
        />
        
        {/* Inner Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="35" 
          fill="url(#innerGradient)" 
          stroke="#ffffff" 
          strokeWidth="2"
        />
        
        {/* Central Globe with 3D effect */}
        <circle 
          cx="50" 
          cy="50" 
          r="20" 
          fill="url(#globeGradient)" 
          stroke="#ffffff" 
          strokeWidth="1.5"
        />
        
        {/* Globe Lines - More detailed */}
        <path 
          d="M 30 50 Q 50 35 70 50" 
          stroke="#ffffff" 
          strokeWidth="2" 
          fill="none"
          opacity="0.9"
        />
        <path 
          d="M 30 50 Q 50 65 70 50" 
          stroke="#ffffff" 
          strokeWidth="2" 
          fill="none"
          opacity="0.9"
        />
        <line 
          x1="50" 
          y1="30" 
          x2="50" 
          y2="70" 
          stroke="#ffffff" 
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Additional decorative lines */}
        <path 
          d="M 30 50 Q 50 40 70 50" 
          stroke="#ffffff" 
          strokeWidth="1" 
          fill="none"
          opacity="0.6"
        />
        <path 
          d="M 30 50 Q 50 60 70 50" 
          stroke="#ffffff" 
          strokeWidth="1" 
          fill="none"
          opacity="0.6"
        />
        
        {/* Enhanced Stars with glow effect */}
        <g fill="#ffffff" opacity="0.9">
          <circle cx="20" cy="20" r="2.5" />
          <circle cx="80" cy="25" r="2" />
          <circle cx="15" cy="80" r="2" />
          <circle cx="85" cy="75" r="2.5" />
          <circle cx="25" cy="15" r="1.5" />
          <circle cx="75" cy="85" r="1.5" />
        </g>
        
        {/* Sparkle effects */}
        <g fill="#ffffff" opacity="0.7">
          <circle cx="35" cy="25" r="1" />
          <circle cx="65" cy="75" r="1" />
          <circle cx="25" cy="60" r="1" />
          <circle cx="75" cy="40" r="1" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="30%" stopColor="#1d4ed8" />
            <stop offset="70%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="outerStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="50%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Enhanced Logo Text */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          StudySphere
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
          Online Learning Platform
        </span>
      </div>
    </div>
  );
};

export default StudySphereLogo;
