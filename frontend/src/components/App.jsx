import BlogForm from './BlogForm';
import Nav from './Nav';
import NoPage from './NoPage';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

export default function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Nav />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path='blog-form'
            element={<BlogForm />}
          />
        </Route>
        <Route
          path='*'
          element={<NoPage />}
        />
      </Routes>
    </div>
  );
}
