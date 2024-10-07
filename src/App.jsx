import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookList from './pages/bookList';
import AddBook from './pages/addBook';
import BookDetails from './pages/bookDetails';
import LandingPage from './pages/landingPage';
import EditBook from './pages/editBook';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
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
      path: "/edit",
      element: <EditBook />
    }
  ])

  return <RouterProvider router={router} />
}
export default App;
