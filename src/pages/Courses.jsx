import CourseList from '../components/course/CourseList';

const Courses = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover a world of knowledge with our comprehensive course library. 
              From beginner-friendly tutorials to advanced masterclasses, find the perfect course to advance your skills.
            </p>
          </div>

          {/* Course Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'Web Development',
              'Programming',
              'Data Science',
              'Design',
              'Mobile Development',
              'Cloud Computing',
              'DevOps',
              'AI & Machine Learning'
            ].map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-all duration-200"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Course List */}
        <CourseList />
      </div>
    </div>
  );
};

export default Courses;