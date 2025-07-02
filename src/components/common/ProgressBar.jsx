import { useEffect, useState } from 'react';

const ProgressBar = ({ progress, size = 'md', showPercentage = true, animated = true, className = '' }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animated]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressGradient = (progress) => {
    if (progress < 30) return 'from-red-500 to-red-600';
    if (progress < 70) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-600';
  };

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className={`font-medium text-gray-700 dark:text-gray-300 ${textSizeClasses[size]}`}>
            Progress
          </span>
          <span className={`font-semibold text-gray-900 dark:text-gray-100 ${textSizeClasses[size]}`}>
            {Math.round(animatedProgress)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} bg-gradient-to-r ${getProgressGradient(animatedProgress)} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${Math.min(animatedProgress, 100)}%` }}
        >
          {/* Shimmer effect */}
          {animated && animatedProgress > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
          )}
        </div>
      </div>
      
      {/* Progress milestones */}
      {size === 'lg' || size === 'xl' ? (
        <div className="flex justify-between mt-1">
          {[0, 25, 50, 75, 100].map((milestone) => (
            <div
              key={milestone}
              className={`text-xs ${
                animatedProgress >= milestone 
                  ? 'text-primary-600 dark:text-primary-400 font-medium' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {milestone}%
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProgressBar;