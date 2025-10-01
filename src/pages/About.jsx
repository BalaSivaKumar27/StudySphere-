import { Users, Target, Award, Heart, Globe, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '250K+', label: 'Active Learners' },
    { icon: BookOpen, value: '30+', label: 'Expert Courses' },
    { icon: Globe, value: '50+', label: 'Countries Reached' },
    { icon: Award, value: '95%', label: 'Success Rate' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence in Education',
      description: 'We strive to provide the highest quality educational content that meets industry standards and prepares learners for real-world challenges.'
    },
    {
      icon: Heart,
      title: 'Student-Centric Approach',
      description: 'Every decision we make is centered around our students\' success. We listen, adapt, and continuously improve based on learner feedback.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Technology',
      description: 'We leverage cutting-edge technology and innovative teaching methods to create engaging and effective learning experiences.'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Education should be accessible to everyone, everywhere. We break down barriers and make quality learning available globally.'
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former Stanford professor with 15+ years in educational technology and curriculum development.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Ex-Google engineer specializing in scalable learning platforms and AI-driven educational tools.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Curriculum',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Educational designer with expertise in creating engaging, industry-relevant course content.'
    },
    {
      name: 'David Kim',
      role: 'Head of Student Success',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Dedicated to ensuring every student achieves their learning goals through personalized support.'
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'StudySphere Founded',
      description: 'Started with a vision to democratize quality education through technology.'
    },
    {
      year: '2021',
      title: 'First 10K Students',
      description: 'Reached our first major milestone with students from over 25 countries.'
    },
    {
      year: '2022',
      title: 'Industry Partnerships',
      description: 'Formed partnerships with leading tech companies for real-world projects.'
    },
    {
      year: '2023',
      title: 'AI-Powered Learning',
      description: 'Introduced personalized learning paths using artificial intelligence.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to serve students in 50+ countries with localized content.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-28 h-28 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-20 h-20 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About StudySphere
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Empowering learners worldwide with cutting-edge education technology and 
            industry-relevant courses designed for the future of work.
          </p>
        </div>
      </section>

      {/* Stats Section with Dark Background */}
      <section className="py-16 bg-gray-800 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At StudySphere, we believe that quality education should be accessible to everyone, 
                regardless of their location, background, or circumstances. Our mission is to bridge 
                the gap between traditional education and the rapidly evolving demands of the modern workplace.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                We combine cutting-edge technology with expert-designed curricula to create learning 
                experiences that are not just educational, but transformational. Every course is crafted 
                to provide practical, job-ready skills that learners can immediately apply in their careers.
              </p>
              <div className="flex items-center space-x-4">
                <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Transforming careers, one learner at a time
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning online"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-secondary-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These principles guide everything we do and shape the learning experience we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 h-full border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-200">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate educators and technologists working together to revolutionize online learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-secondary-600/20 rounded-full"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From a simple idea to a global learning platform
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-600">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Learning Community
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of a global community of learners who are transforming their careers 
            and building the future through continuous learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Courses
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;