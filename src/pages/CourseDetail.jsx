import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Clock, Users, BookOpen, Play, Download, 
  CheckCircle, Award, ArrowLeft, ChevronRight,
  Globe, Smartphone, Trophy, BarChart3
} from 'lucide-react';
import { courses, lessons, quizzes } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import QuizComponent from '../components/course/QuizComponent';
import ProgressBar from '../components/common/ProgressBar';
import PaymentModal from '../components/payment/PaymentModal';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, enrollInCourse, updateUserProgress } = useAuth();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
  }, [id]);

  const isEnrolled = user?.enrolledCourses?.some(c => c.id === parseInt(id));
  const courseLessons = lessons[parseInt(id)] || [];
  const courseQuiz = quizzes[parseInt(id)];
  const enrolledCourse = user?.enrolledCourses?.find(c => c.id === parseInt(id));

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
    if (!completedLessons.includes(lessonIndex)) {
      const newCompleted = [...completedLessons, lessonIndex];
      setCompletedLessons(newCompleted);
      
      const progress = (newCompleted.length / courseLessons.length) * 100;
      updateUserProgress(parseInt(id), progress);
    }
  };

  const handleQuizComplete = (score) => {
    setShowQuiz(false);
    // Update user progress with quiz completion
    const progress = Math.min((completedLessons.length + 1) / (courseLessons.length + 1) * 100, 100);
    updateUserProgress(parseInt(id), progress);
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
                          onClick={() => setCurrentLesson(index)}
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

                        {/* Lesson Description */}
                        <div className="prose dark:prose-invert max-w-none mb-8">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            In this lesson, you'll learn about {courseLessons[currentLesson].title.toLowerCase()}. 
                            We'll cover the fundamental concepts, practical applications, and best practices 
                            to help you master this important topic.
                          </p>
                        </div>

                        {/* Lesson Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                              disabled={currentLesson === 0}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                              Previous
                            </button>
                            <button
                              onClick={() => setCurrentLesson(Math.min(courseLessons.length - 1, currentLesson + 1))}
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
                  <div className="space-y-4">
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
    </>
  );
};

export default CourseDetail;