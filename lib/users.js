const bcrypt = require('bcryptjs');

let users = [
  {
    id: '1',
    email: 'admin@store.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    name: 'מנהל מערכת',
  },
];

module.exports = {
  getUsers: () => users,
  findUserByEmail: (email) => users.find(u => u.email === email),
  findUserById: (id) => users.find(u => u.id === id),
  createUser: async (data) => {
    const existing = users.find(u => u.email === data.email);
    if (existing) return null;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      id: require('uuid').v4(),
      email: data.email,
      password: hashedPassword,
      name: data.name || data.email.split('@')[0],
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    return { ...user, password: undefined };
  },
  comparePassword: async (plain, hashed) => bcrypt.compare(plain, hashed),
  isAdmin: (email) => {
    const user = users.find(u => u.email === email);
    return user?.role === 'admin';
  },
};