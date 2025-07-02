import { Star, Clock, Users, BookOpen, Play, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import PaymentModal from '../payment/PaymentModal';

const CourseCard = ({ course, variant = 'default' }) => {
  const { user, enrollInCourse } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleEnroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    if (course.price === 'Free') {
      enrollInCourse(course);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    enrollInCourse(course);
    setShowPaymentModal(false);
  };

  const isEnrolled = user?.enrolledCourses?.some(c => c.id === course.id);

  const cardVariants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    featured: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700',
    compact: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  };

  if (variant === 'compact') {
    return (
      <>
        <Link to={`/course/${course.id}`} className="block group">
          <div className={`${cardVariants[variant]} rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center p-4 space-x-4">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.instructor}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{course.lessons} lessons</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${course.price === 'Free' ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                  {course.price}
                </span>
              </div>
            </div>
          </div>
        </Link>
        
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          course={course}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </>
    );
  }

  return (
    <>
      <Link to={`/course/${course.id}`} className="block group">
        <div className={`${cardVariants[variant]} rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${variant === 'featured' ? 'ring-2 ring-primary-200 dark:ring-primary-700' : ''}`}>
          {/* Course Image */}
          <div className="relative overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-white/90 dark:bg-gray-900/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-6 h-6 text-primary-600 fill-current" />
              </div>
            </div>

            {/* Course Level Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                course.level === 'Beginner' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : course.level === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {course.level}
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                course.price === 'Free' 
                  ? 'bg-green-500 text-white'
                  : 'bg-primary-500 text-white'
              }`}>
                {course.price}
              </span>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            {/* Course Title & Description */}
            <div className="mb-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* Course Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                  +{course.tags.length - 3}
                </span>
              )}
            </div>

            {/* Course Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{course.instructor}</span>
              </div>

              {/* Enroll Button */}
              {user && !isEnrolled && (
                <button
                  onClick={handleEnroll}
                  className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-md hover:bg-primary-700 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                >
                  {course.price === 'Free' ? 'Enroll' : 'Buy Now'}
                </button>
              )}
              
              {isEnrolled && (
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-md">
                  Enrolled
                </span>
              )}
            </div>

            {/* Course Progress (if enrolled) */}
            {isEnrolled && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {(() => {
                  const enrolledCourse = user.enrolledCourses.find(c => c.id === course.id);
                  return (
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{enrolledCourse?.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrolledCourse?.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </Link>
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        course={course}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default CourseCard;