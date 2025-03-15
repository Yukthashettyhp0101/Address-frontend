import AllRoutes from './Routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 import styles from './App.module.css'; 
 
 
function App() {
  return (
    <>
      <AllRoutes />
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000}  
        pauseOnHover
        newestOnTop
        closeOnClick
        theme="colored"
      />
    </>
  );
}

export default App;



/*
Background change
Edit button UI fixes
Add button UI fixes
Responsive design for Mobile & Tablet.
Deployment in Vercel / Netlify
*/
