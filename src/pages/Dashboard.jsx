import { Link } from 'react-router-dom';
import { 
  BookOpen, Clock, Trophy, TrendingUp, Play, 
  Calendar, Award, BarChart3, Target, CheckCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';
import CourseCard from '../components/course/CourseCard';
import ProgressBar from '../components/common/ProgressBar';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please log in to view your dashboard</p>
          <Link
            to="/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const enrolledCourses = user.enrolledCourses || [];
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;
  const inProgressCourses = enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).length;
  const averageProgress = totalCourses > 0 
    ? enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / totalCourses 
    : 0;

  const recentCourses = enrolledCourses
    .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
    .slice(0, 3);

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: totalCourses,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: completedCourses,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Clock,
      label: 'In Progress',
      value: inProgressCourses,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: TrendingUp,
      label: 'Average Progress',
      value: `${Math.round(averageProgress)}%`,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
  ];

  const achievements = [
    { 
      icon: Trophy, 
      title: 'First Course', 
      description: 'Enrolled in your first course',
      earned: totalCourses > 0,
      color: 'text-yellow-500'
    },
    { 
      icon: Target, 
      title: 'Quick Learner', 
      description: 'Completed a course in under a week',
      earned: completedCourses > 0,
      color: 'text-blue-500'
    },
    { 
      icon: Award, 
      title: 'Dedicated Student', 
      description: 'Completed 3 courses',
      earned: completedCourses >= 3,
      color: 'text-green-500'
    },
    { 
      icon: BarChart3, 
      title: 'Progress Master', 
      description: 'Maintained 80%+ average progress',
      earned: averageProgress >= 80,
      color: 'text-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-white/20"
              />
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-white/90 mt-1">
                  Ready to continue your learning journey?
                </p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${stat.color} rounded-lg`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            {recentCourses.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Continue Learning
                  </h2>
                  <Link
                    to="/courses"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentCourses.map((enrolledCourse) => {
                    const course = courses.find(c => c.id === enrolledCourse.id);
                    if (!course) return null;
                    
                    return (
                      <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {course.instructor}
                            </p>
                            <ProgressBar
                              progress={enrolledCourse.progress || 0}
                              size="sm"
                              showPercentage={false}
                            />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {enrolledCourse.progress || 0}%
                            </div>
                            <Link
                              to={`/course/${course.id}`}
                              className="inline-flex items-center mt-2 px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-md hover:bg-primary-700 transition-colors duration-200"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Continue
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recommended Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recommended for You
                </h2>
                <Link
                  to="/courses"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                >
                  Browse All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses
                  .filter(course => !enrolledCourses.some(ec => ec.id === course.id))
                  .slice(0, 4)
                  .map(course => (
                    <CourseCard key={course.id} course={course} variant="compact" />
                  ))}
              </div>
            </div>

            {/* Learning Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {enrolledCourses.slice(0, 5).map((enrolledCourse) => {
                  const course = courses.find(c => c.id === enrolledCourse.id);
                  if (!course) return null;
                  
                  return (
                    <div key={course.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          Enrolled in <span className="font-medium">{course.title}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(enrolledCourse.enrolledAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                {enrolledCourses.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No learning activity yet
                    </p>
                    <Link
                      to="/courses"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Progress
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {Math.round(averageProgress)}%
                    </span>
                  </div>
                  <ProgressBar progress={averageProgress} size="md" showPercentage={false} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {totalCourses}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total Courses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {completedCourses}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Achievements
              </h3>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700'
                        : 'bg-gray-50 dark:bg-gray-700 opacity-60'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      achievement.earned 
                        ? 'bg-white dark:bg-gray-800 shadow-sm' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      <achievement.icon className={`w-5 h-5 ${
                        achievement.earned ? achievement.color : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        achievement.earned 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Browse Courses</span>
                </Link>
                
                <button className="flex items-center space-x-3 w-full p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Schedule Study Time</span>
                </button>
                
                <button className="flex items-center space-x-3 w-full p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">View Certificates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;