import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('studysphere_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('studysphere_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studysphere_user');
  };

  const updateUserProgress = (courseId, progress) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      enrolledCourses: user.enrolledCourses.map(course =>
        course.id === courseId ? { ...course, progress } : course
      )
    };
    
    setUser(updatedUser);
    localStorage.setItem('studysphere_user', JSON.stringify(updatedUser));
  };

  const enrollInCourse = (course) => {
    if (!user) return;
    
    const isAlreadyEnrolled = user.enrolledCourses.some(c => c.id === course.id);
    if (isAlreadyEnrolled) return;
    
    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, { ...course, progress: 0, enrolledAt: new Date().toISOString() }]
    };
    
    setUser(updatedUser);
    localStorage.setItem('studysphere_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    loading,
    updateUserProgress,
    enrollInCourse,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};