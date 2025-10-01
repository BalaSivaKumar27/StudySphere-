import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Clock, Users, BookOpen, Play, Download, 
  CheckCircle, Award, ArrowLeft, ChevronRight,
  Globe, Smartphone, Trophy, BarChart3
} from 'lucide-react';
import { courses, lessons, quizzes, lessonContent } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import QuizComponent from '../components/course/QuizComponent';
import ProgressBar from '../components/common/ProgressBar';
import PaymentModal from '../components/payment/PaymentModal';
import CertificateGenerator from '../components/certificate/CertificateGenerator';
import CourseCompletionModal from '../components/certificate/CourseCompletionModal';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, enrollInCourse, updateUserProgress, markLessonComplete, updateLastAccessedLesson, markCourseComplete } = useAuth();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Define variables before useEffect to avoid circular dependencies
  const isEnrolled = user?.enrolledCourses?.some(c => c.id === parseInt(id));
  const courseLessons = lessons[parseInt(id)] || [];
  const courseQuiz = quizzes[parseInt(id)];
  const enrolledCourse = user?.enrolledCourses?.find(c => c.id === parseInt(id));
  const currentLessonContent = lessonContent[parseInt(id)]?.[courseLessons[currentLesson]?.id];
  const isCourseCompleted = enrolledCourse?.isCompleted || false;

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    
    // Set current lesson to last accessed lesson if enrolled
    if (isEnrolled && enrolledCourse?.lastAccessedLesson) {
      const lessonIndex = courseLessons.findIndex(lesson => lesson.id === enrolledCourse.lastAccessedLesson);
      if (lessonIndex !== -1) {
        setCurrentLesson(lessonIndex);
      }
    }

    // Initialize completed lessons from user's progress
    if (isEnrolled && enrolledCourse?.completedLessons) {
      const completedLessonIndices = enrolledCourse.completedLessons.map(lessonId => 
        courseLessons.findIndex(lesson => lesson.id === lessonId)
      ).filter(index => index !== -1);
      setCompletedLessons(completedLessonIndices);
    }
  }, [id, isEnrolled, enrolledCourse, courseLessons, user]);

  const handleEnroll = () => {
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

  const handleLessonComplete = (lessonIndex) => {
    const lessonId = courseLessons[lessonIndex]?.id;
    if (!completedLessons.includes(lessonIndex) && lessonId) {
      const newCompleted = [...completedLessons, lessonIndex];
      setCompletedLessons(newCompleted);
      
      // Calculate progress including quiz (if exists)
      const totalItems = courseLessons.length + (courseQuiz ? 1 : 0);
      const completedItems = newCompleted.length;
      const progress = Math.round((completedItems / totalItems) * 100);
      
      // Update progress in the context
      updateUserProgress(parseInt(id), progress);
      markLessonComplete(parseInt(id), lessonId);
      
      // Force a small delay to ensure state updates
      setTimeout(() => {
        // Check if course is completed (all lessons completed, no quiz or quiz already completed)
        if (progress >= 100) {
          markCourseComplete(parseInt(id));
          // Show completion modal after a short delay
          setTimeout(() => {
            setShowCompletionModal(true);
          }, 1000);
        }
      }, 100);
    }
  };

  const handleLessonChange = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
    const lessonId = courseLessons[lessonIndex]?.id;
    if (lessonId) {
      updateLastAccessedLesson(parseInt(id), lessonId);
    }
  };

  const handleQuizComplete = (score) => {
    setShowQuiz(false);
    // Update user progress with quiz completion
    const totalItems = courseLessons.length + (courseQuiz ? 1 : 0);
    const completedItems = completedLessons.length + 1; // +1 for quiz completion
    const progress = (completedItems / totalItems) * 100;
    
    updateUserProgress(parseInt(id), progress);
    
    // Check if course is completed (all lessons + quiz)
    if (progress >= 100) {
      markCourseComplete(parseInt(id));
      // Show completion modal after a short delay
      setTimeout(() => {
        setShowCompletionModal(true);
      }, 1000);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading course...</p>
        </div>
      </div>
    );
  }

  if (showQuiz && courseQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => setShowQuiz(false)}
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </button>
          </div>
          <QuizComponent quiz={courseQuiz} onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6">
              <Link
                to="/courses"
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {course.duration}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-white/90 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-white/80">rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>{course.quizzes} quizzes</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-white/90">
                    Instructor: <span className="font-semibold">{course.instructor}</span>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.price}
                    </div>
                    {course.price !== 'Free' && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${parseInt(course.price.replace('$', '')) * 1.5}
                      </div>
                    )}
                  </div>

                  {isEnrolled ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <p className="text-green-600 dark:text-green-400 font-medium">
                          You're enrolled!
                        </p>
                      </div>
                      {enrolledCourse && (
                        <ProgressBar
                          progress={enrolledCourse.progress || 0}
                          size="lg"
                          className="mb-4"
                        />
                      )}
                      <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                      >
                        Continue Learning
                      </button>
                    </div>
                  ) : user ? (
                    <button
                      onClick={handleEnroll}
                      className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      {course.price === 'Free' ? 'Enroll Now' : 'Buy Now'}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/signup"
                        className="block w-full py-3 bg-primary-600 text-white text-center font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                      >
                        Sign Up to Enroll
                      </Link>
                      <Link
                        to="/login"
                        className="block w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-center font-semibold rounded-lg hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                      >
                        Already have an account?
                      </Link>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Globe className="w-4 h-4 mr-2" />
                      Access on desktop & mobile
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Award className="w-4 h-4 mr-2" />
                      Certificate of completion
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Track your progress
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        {isEnrolled && courseLessons.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`grid ${showSidebar ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
              {/* Course Sidebar */}
              {showSidebar && (
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Course Content
                      </h3>
                      <button
                        onClick={() => setShowSidebar(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {enrolledCourse && (
                      <div className="mb-6">
                        <ProgressBar
                          progress={enrolledCourse.progress || 0}
                          size="md"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      {courseLessons.map((lesson, index) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonChange(index)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            currentLesson === index
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {completedLessons.includes(index) ? (
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                                currentLesson === index
                                  ? 'border-primary-500'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`} />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{lesson.title}</p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                                <span className="capitalize">{lesson.type}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}

                      {courseQuiz && (
                        <button
                          onClick={() => setShowQuiz(true)}
                          className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-4 pt-4"
                        >
                          <div className="flex items-center space-x-3">
                            <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Final Quiz</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Test your knowledge
                              </p>
                            </div>
                          </div>
                        </button>
                      )}

                      {/* Certificate Button for Completed Courses */}
                      {isCourseCompleted && (
                        <button
                          onClick={() => setShowCertificate(true)}
                          className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 mt-4"
                        >
                          <div className="flex items-center space-x-3">
                            <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Download Certificate</p>
                              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                                Course completed! Get your certificate
                              </p>
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Lesson Content */}
              <div className={showSidebar ? 'lg:col-span-3' : 'col-span-1'}>
                {!showSidebar && (
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="mb-4 flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Show Course Content
                  </button>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  {courseLessons[currentLesson] && (
                    <>
                      {/* Lesson Header */}
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {courseLessons[currentLesson].title}
                          </h2>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{courseLessons[currentLesson].duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            courseLessons[currentLesson].type === 'video'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {courseLessons[currentLesson].type === 'video' ? 'Video Lesson' : 'Interactive'}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Lesson {currentLesson + 1} of {courseLessons.length}
                          </span>
                        </div>
                      </div>

                      {/* Lesson Content */}
                      <div className="p-6">
                        {courseLessons[currentLesson].type === 'video' ? (
                          <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                            <div className="text-center text-white">
                              <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                              <p className="text-lg">Video Player</p>
                              <p className="text-sm opacity-80">
                                {courseLessons[currentLesson].title}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-8 mb-6">
                            <div className="text-center">
                              <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Interactive Lesson
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300">
                                Hands-on practice with {courseLessons[currentLesson].title.toLowerCase()}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Rich Lesson Content */}
                        {currentLessonContent ? (
                          <div className="space-y-8 mb-8">
                            {/* Theory Section */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2" />
                                Theory & Concepts
                              </h3>
                              <div className="prose dark:prose-invert max-w-none">
                                <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                                  {currentLessonContent.theory}
                                </pre>
                              </div>
                            </div>

                            {/* Code Snippet Section */}
                            {currentLessonContent.codeSnippet && (
                              <div className="bg-gray-900 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  Code Example
                                </h3>
                                <pre className="text-green-400 text-sm overflow-x-auto">
                                  <code>{currentLessonContent.codeSnippet}</code>
                                </pre>
                              </div>
                            )}

                            {/* References Section */}
                            {currentLessonContent.references && currentLessonContent.references.length > 0 && (
                              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                  </svg>
                                  Additional Resources
                                </h3>
                                <ul className="space-y-2">
                                  {currentLessonContent.references.map((ref, index) => (
                                    <li key={index} className="text-sm">
                                      <a 
                                        href={ref.split(': ')[1]} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 underline"
                                      >
                                        {ref}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Fallback Description */
                          <div className="prose dark:prose-invert max-w-none mb-8">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              In this lesson, you'll learn about {courseLessons[currentLesson].title.toLowerCase()}. 
                              We'll cover the fundamental concepts, practical applications, and best practices 
                              to help you master this important topic.
                            </p>
                          </div>
                        )}

                        {/* Lesson Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleLessonChange(Math.max(0, currentLesson - 1))}
                              disabled={currentLesson === 0}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                              Previous
                            </button>
                            <button
                              onClick={() => handleLessonChange(Math.min(courseLessons.length - 1, currentLesson + 1))}
                              disabled={currentLesson === courseLessons.length - 1}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                              Next
                            </button>
                          </div>

                          <button
                            onClick={() => handleLessonComplete(currentLesson)}
                            disabled={completedLessons.includes(currentLesson)}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                              completedLessons.includes(currentLesson)
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                            }`}
                          >
                            {completedLessons.includes(currentLesson) ? (
                              <>
                                <CheckCircle className="w-4 h-4 inline mr-2" />
                                Completed
                              </>
                            ) : (
                              'Mark as Complete'
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Overview for Non-enrolled Users */}
        {!isEnrolled && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* What You'll Learn */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    What You'll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Master the fundamentals and advanced concepts',
                      'Build real-world projects and applications',
                      'Learn industry best practices and standards',
                      'Gain hands-on experience with practical exercises',
                      'Understand common patterns and solutions',
                      'Prepare for professional development roles'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Course Content
                  </h2>
                  <div className="relative">
                    <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-300 text-sm">
                      Unlock full course content by enrolling. Preview below is partially hidden until purchase.
                    </div>
                    <div className="space-y-4 blur-[1.5px] pointer-events-none select-none">
                    {courseLessons.slice(0, 5).map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Play className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {lesson.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {lesson.type} • {lesson.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {courseLessons.length > 5 && (
                      <div className="text-center py-4">
                        <p className="text-gray-500 dark:text-gray-400">
                          + {courseLessons.length - 5} more lessons
                        </p>
                      </div>
                    )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center bg-white/95 dark:bg-gray-900/95 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-600 dark:text-yellow-400">
                            <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 8H9V6a3 3 0 116 0v3z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Course Content Locked
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Enroll now to access all lessons, code examples, and resources
                        </p>
                        <button
                          onClick={handleEnroll}
                          className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                        >
                          {course.price === 'Free' ? 'Enroll Now' : `Buy Now - ${course.price}`}
                        </button>
                      </div>
                    </div>
                    {courseLessons.length === 0 && (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Course content will be available after enrollment
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Course Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Instructor
                  </h3>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {course.instructor}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Expert {course.tags[0]} Developer
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      With over 10 years of experience in the industry, our instructor brings 
                      real-world expertise and practical knowledge to help you succeed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        course={course}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <CertificateGenerator
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        course={course}
        user={user}
        completionDate={enrolledCourse?.completedAt ? new Date(enrolledCourse.completedAt).toLocaleDateString() : new Date().toLocaleDateString()}
      />

      <CourseCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        course={course}
        onViewCertificate={() => {
          setShowCompletionModal(false);
          setShowCertificate(true);
        }}
      />
    </>
  );
};

export default CourseDetail;