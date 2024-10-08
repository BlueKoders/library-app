import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookList from './pages/bookList';
import AddBook from './pages/addBook';
import BookDetails from './pages/bookDetails';
import LandingPage from './pages/landingPage';
import EditBook from './pages/editBook';
import GetStarted from './pages/landingPage/components/GetStarted';
import Login from './pages/landingPage/components/Login';
import Footer from './pages/landingPage/components/Footer';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/sign-up",
      element: <GetStarted />
    },
    {
      path: "/books",
      element: <BookList />,
    },
    {
      path: "/add-new",
      element: <AddBook />,
    },
    {
      path: "/books/:id",
      element: <BookDetails />,
    },
    {
      path: "/edit/:id",
      element: <EditBook />
    },
    {
      path: "/footer",
      element: <Footer />
    }


    
  ])

  return <RouterProvider router={router} />
}
export default App;
