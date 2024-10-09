import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BookList from './pages/bookList';
import AddBook from './pages/addBook';
import BookDetails from './pages/bookDetails';
import LandingPage from './pages/landingPage';
import EditBook from './pages/editBook';
import GetStarted from './pages/landingPage/components/GetStarted';
import Login from './pages/landingPage/components/Login';
import Footer from './pages/landingPage/components/Footer';
import PageFlipWrapper from './components/PageFlipWrapper'; // The wrapper for flip effect

// App component
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/login",
      element: <PageFlipWrapper><Login /></PageFlipWrapper>
    },
    {
      path: "/sign-up",
      element: <PageFlipWrapper><GetStarted /></PageFlipWrapper>
    },
    {
      path: "/books",
      element: <PageFlipWrapper><BookList /></PageFlipWrapper>,
    },
    {
      path: "/add-new",
      element: <PageFlipWrapper><AddBook /></PageFlipWrapper>,
    },
    {
      path: "/books/:id",
      element: <PageFlipWrapper><BookDetails /></PageFlipWrapper>,
    },
    {
      path: "/edit/:id",
      element: <PageFlipWrapper><EditBook /></PageFlipWrapper>
    },
    {
      path: "/footer",
      element: <Footer />
    }
  ]);

  return (
    <AnimatePresence mode="wait">
      {/* RouterProvider renders the router */}
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;