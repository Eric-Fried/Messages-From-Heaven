import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { SignUpForm } from './pages/SignUpForm';
import { SignInForm } from './pages/SignInForm';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Catalog />} />
          <Route path="plans/:planId" element={<ProductDetails />} />
          <Route path="about" element={<div>About</div>} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
}
