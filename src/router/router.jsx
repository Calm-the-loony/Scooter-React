import { createBrowserRouter } from "react-router-dom";
import MainSection from "../components/sections/MainSection";
import ShippingPage from "../components/pages/ShippingPage";
import ReturnsPage from "../components/pages/ReturnsPage";
import SalesroomPage from "../components/pages/SalesroomPage";
import LegalPage from "../components/pages/LegalPage";
import RightOfWithdrawalPage from "../components/pages/RightOfWithdrawalPage";
import JobsPage from "../components/pages/JobsPage";
import TechTipsPage from "../components/pages/TechTipsPage";
import BrandsPage from "../components/pages/BrandsPage";
import CartPage from "../components/pages/CartPage";
import FavoritesPage from "../components/pages/FavoritesPage";
import GaragePage from "../components/pages/GaragePage";
import RegisterPage from "../components/pages/RegistrationPage";
import VerifyCodePage from "../components/pages/VerifyCodePage";
import LoginPage from "../components/pages/LoginPage";
import ProductPage from "../components/pages/ProductPage";
import SearchResults from "../components/other/SearchResults";
import CategoryPage from "../components/pages/CategoryPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import AuthenticatedWrapper from "./isAuthenticatedWrapper";
import AccountPage from "../components/pages/AccountPage";
import PayPage from "../components/pages/PayPage";
import Layout from "./generalPage";
import CheckoutPage from "../components/pages/CheckoutPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainSection />,
      },
      {
        path: "/pay",
        element: <PayPage />,
      },
      {
        path: "/shipping",
        element: <ShippingPage />,
      },
      {
        path: "/return",
        element: <ReturnsPage />,
      },
      {
        path: "/salesroom",
        element: <SalesroomPage />,
      },
      {
        path: "/legal",
        element: <LegalPage />,
      },
      {
        path: "/right",
        element: <RightOfWithdrawalPage />,
      },
      {
        path: "/jobs",
        element: <JobsPage />,
      },
      {
        path: "/tech",
        element: <TechTipsPage />,
      },
      {
        path: "/brand",
        element: <BrandsPage />,
      },

      {
        path: "/cart",
        element: (
          <AuthenticatedWrapper>
            <CartPage />
          </AuthenticatedWrapper>
        ),
      },
      {
        path: "/checkout",
        element: (
          <AuthenticatedWrapper>
            <CheckoutPage />
          </AuthenticatedWrapper>
        ),
      },
      {
        path: "/favorites",
        element: (
          <AuthenticatedWrapper>
            <FavoritesPage />
          </AuthenticatedWrapper>
        ),
      },
      {
        path: "/garage",
        element: (
          <AuthenticatedWrapper>
            <GaragePage />
          </AuthenticatedWrapper>
        ),
      },
      {
        path: "/account",
        element: (
          <AuthenticatedWrapper>
            <AccountPage />
          </AuthenticatedWrapper>
        ),
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/verify-code",
        element: <VerifyCodePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/search-results",
        element: <SearchResults />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/category/:id_category",
        element: <CategoryPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
