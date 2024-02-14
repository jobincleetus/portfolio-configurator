import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/scss/app.scss'
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from "react-router-dom";
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Edit from './pages/Edit.jsx';
import { store } from './store/index';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit",
    element: <Edit />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
)
