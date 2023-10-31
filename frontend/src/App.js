import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import HomePage from './pages/HomePage';
import FooterComponent from './components/FooterComponent';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotificationsPage from './pages/user/NotificationsPage';

import ScrollToTop from './utils/ScrollToTop';

import UserProfilePage from './pages/user/UserProfilePage';
import UserClassesPage from './pages/user/UserClassesPage';
import UserSignUpForClassesPage from './pages/user/UserSignUpForClassesPage';

import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminEditUserPage from './pages/admin/AdminEditUserPage';
import AdminDispositionsPage from './pages/admin/AdminDispositionsPage';
import AdminClassesPage from './pages/admin/AdminClassesPage';

import ProtectedRoutesComponent from './components/ProtectedRoutesComponent';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>Ups website not exists</h1>} />

        <Route element={<ProtectedRoutesComponent admin={false} />} >
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/classes" element={<UserClassesPage />} />
          <Route path="/user/sign" element={<UserSignUpForClassesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>

        <Route element={<ProtectedRoutesComponent admin={true} />} >
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user/:id" element={<AdminEditUserPage />} />
          <Route path="/admin/dispositions" element={<AdminDispositionsPage />} />
          <Route path="/admin/classes" element={<AdminClassesPage />} />
        </Route>

      </Routes>
      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;
