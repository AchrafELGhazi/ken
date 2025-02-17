import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Navbar } from './components/shared/Navbar';
import { Home } from './pages/Home';
import FileUploadForm from './pages/fileupload';


const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/test' element={<FileUploadForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
