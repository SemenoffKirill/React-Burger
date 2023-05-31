import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIngredientsData } from '../../services/actions/ingredients';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPage } from '../../pages/passForgot/passForgot';
import { ResetPage } from '../../pages/passReset/passReset';
import { PageNotfound } from '../../pages/404/404';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { IngredientPage } from '../../pages/ingredients/ingredients';
import { FeedPage } from '../../pages/feed/feed';
import { getUserInfo } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfo.user);
  const access = getCookie('accessToken');

  useEffect(() => {
    dispatch(getIngredientsData());
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                !userData && !access ? <LoginPage /> : <Navigate to={'/'} />
              }
            />
            <Route
              path="/register"
              element={
                !userData && !access ? <RegisterPage /> : <Navigate to={'/'} />
              }
            />
            <Route
              path="/forgot-password"
              element={
                !userData && !access ? <ForgotPage /> : <Navigate to={'/'} />
              }
            />
            <Route path="/reset-password" element={<ResetPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute element={<ProfilePage />} to={'/login'} />
              }
            />
            <Route path="/feed" element={<FeedPage />}>
              <Route path="/feed/:id" /> {}
            </Route>{' '}
            {}
            <Route path="/profile/orders">
              <Route path="/profile/orders/:id" />{' '}
              {}
            </Route>{' '}
            {}
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
