import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import appRoute from './components/AppRoutes'
import ProtectedRoute from './components/ProtectedRoutes'
import ScrollReveal from './components/ScrollReveal'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer/>
        <Header/>
        <Routes>
        {appRoute.map((route, index) => {
          const Page = route.Component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.role ? (
                  <ProtectedRoute roleRequired={route.role}>
                    <Page />
                  </ProtectedRoute>
                ) : (
                  <Page />
                )
              }
            />
          );
        })}
      </Routes>
      <a
  href="https://wa.me/919511150059?text=Hi%20ModaStitch,%20I%E2%80%99m%20interested%20in%20your%20shirts"
  target="_blank"
  rel="noopener noreferrer"
  className="
    fixed bottom-4 right-4 z-50
    bg-green-500 hover:bg-green-600
    text-white
    w-12 h-12 sm:w-14 sm:h-14
    rounded-full
    flex items-center justify-center
    shadow-2xl
    transition-transform hover:scale-110
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
  >
    <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2.1 7.8L.2 31.5l7.9-2.1c2.3 1.2 5 1.9 7.9 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5z" />
  </svg>
</a>

        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
