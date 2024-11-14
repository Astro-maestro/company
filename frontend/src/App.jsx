import './App.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Forgotpassword from './components/auth/Forgotpassword';
import Updatepassword from './components/auth/Updatepassword';
import ErrorPage from './pages/error/ErrorPage';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Blog from './pages/blog/Blog';
import Courses from './pages/courses/Courses';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import BlogDetails from './components/blog/BlogDetails';
import ApplyCourse from './components/courses/ApplyCourse';



const routerObj = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
      <Route index element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<Forgotpassword/>}/>
      <Route path="/update-password/:id" element={<Updatepassword/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/blog" element={<ProtectedRoute><Blog/></ProtectedRoute>}/>
      <Route path="/blogs/:blogId" element={<ProtectedRoute><BlogDetails/></ProtectedRoute>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/course/apply" element={<ApplyCourse/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Route>
  )
)

function App() {


  return (
    <>
      <RouterProvider router={routerObj}/>
      <ScrollToTop/>
    </>
  )
}

export default App
