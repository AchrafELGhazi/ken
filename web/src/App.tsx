import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Navbar } from './components/shared/Navbar';
import { Home } from './pages/Home';
import FileUploadForm from './pages/fileupload';
import { AuthGuard } from './utils/AuthGuard';
import { NGOGuard } from './utils/NGOGuard';
import { ClientGuard } from './utils/ClientGuard';
import Settings from './pages/Settings';
import { Profile } from './pages/Profile';


const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<AuthGuard />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/settings' element={<Settings />} />
          </Route>

          <Route element={<NGOGuard />}>
            {/* <Route path='/ngo-dashboard' element={<NGODashboard />} />
            <Route path='/post-opportunity' element={<PostOpportunity />} />
            <Route
              path='/manage-opportunities'
              element={<ManageOpportunities />}
            /> */}
          </Route>

          <Route element={<ClientGuard />}>
            {/* <Route path='/client-dashboard' element={<ClientDashboard />} />
            <Route path='/applications' element={<Applications />} />
            <Route
              path='/saved-opportunities'
              element={<SavedOpportunities />}
            /> */}
          </Route>

          <Route path='/test' element={<FileUploadForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
