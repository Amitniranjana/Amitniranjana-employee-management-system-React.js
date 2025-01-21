import { useState, useContext, useEffect } from 'react';
import Login from './component/Login.jsx';
import './styles/Login.css';
import AdminDashboard from './component/DashBoard/AdminDashboard.jsx';
import EmployeeDashboard from './component/DashBoard/EmployeeDashboard.jsx';
import { AuthContext } from './context/AuthProvider.jsx';
import { setLocalStorage } from './utlis/LocalStorage.jsx';

const App = () => {

  setLocalStorage();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Store detailed user data
  const authData = useContext(AuthContext);

  useEffect(() => {

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser.role);
        setCurrentUser(parsedUser.data); // Store full user data if available
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  const handleLogin = (email, password) => {
    if (!authData) return;

    const adminUser = authData.admin.find(
      (event) => email === event.email && password === event.password
    );

    const employeeUser = authData.employees.find(
      (event) => email === event.email && password === event.password
    );

    if (adminUser) {
      setUser('admin');
      setCurrentUser(adminUser)
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));

    } else if (employeeUser) {
      setUser('employee');
      setCurrentUser(employeeUser); // Store full employee data
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ role: 'employee', data: employeeUser })
      );
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === 'admin' && <AdminDashboard   data={currentUser}/>}
      {user === 'employee' && <EmployeeDashboard data={currentUser} />}
    </>
  );
};

export default App;
