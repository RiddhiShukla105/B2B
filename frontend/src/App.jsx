import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import appRoute from './components/AppRoutes'
import ProtectedRoute from './Components/ProtectedRoutes'

const App = () => {
  return (
    <div>
      <BrowserRouter>
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
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
