import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navigation from './components/layout/Navigation';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import CreateProfile from './components/profile/create-profile/CreateProfile';
import EditProfile from './components/profile/edit-profile/EditProfile';
import AddExperience from './components/profile/add-credentials/AddExperience';
import AddEducation from './components/profile/add-credentials/AddEducation';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';

import './App.css';

import { UserProvider } from './hooks/userContext';

const queryClient = new QueryClient();

const App = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <UserProvider>
        <Router>
          <div className="App page-container">
            <Navigation />
            <div className="content-wrap">
              <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:handle" element={<Profile />} />
                <Route path="/post/:postId" element={<Post />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/create-profile" element={<CreateProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/experience" element={<AddExperience />} />
                <Route path="/education" element={<AddEducation />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
      {/* </ReactQueryDevtools> */}
    </QueryClientProvider>
  );
};

export default App;
