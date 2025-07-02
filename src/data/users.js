export const dummyUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinedAt: '2024-01-15',
    enrolledCourses: [
      { id: 1, progress: 75, enrolledAt: '2024-01-20', completedLessons: 9, quizScores: [85, 92] },
      { id: 3, progress: 45, enrolledAt: '2024-02-01', completedLessons: 11, quizScores: [78] },
      { id: 4, progress: 20, enrolledAt: '2024-02-15', completedLessons: 6, quizScores: [] },
    ],
    totalCoursesCompleted: 2,
    averageScore: 85,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinedAt: '2024-02-01',
    enrolledCourses: [
      { id: 2, progress: 90, enrolledAt: '2024-02-05', completedLessons: 16, quizScores: [95, 88, 92] },
      { id: 6, progress: 60, enrolledAt: '2024-02-20', completedLessons: 21, quizScores: [82, 89] },
    ],
    totalCoursesCompleted: 1,
    averageScore: 89,
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@studysphere.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinedAt: '2024-01-01',
    enrolledCourses: [],
    totalCoursesCompleted: 0,
    averageScore: 0,
  },
];

export const authenticateUser = (email, password) => {
  return dummyUsers.find(user => user.email === email && user.password === password);
};

export const registerUser = (userData) => {
  const newUser = {
    id: dummyUsers.length + 1,
    ...userData,
    role: 'student',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinedAt: new Date().toISOString().split('T')[0],
    enrolledCourses: [],
    totalCoursesCompleted: 0,
    averageScore: 0,
  };
  
  dummyUsers.push(newUser);
  return newUser;
};