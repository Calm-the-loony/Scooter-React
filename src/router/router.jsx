import React from "react";
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
import ErrorPage from "../components/pages/ErrorPage";
import ForgotPasswordPage from "../components/pages/ForgotPasswordPage";
import VerifyResetCodePage from "../components/pages/VerifyResetCodePage";

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <ErrorPage />, 
      children: [
        {
          path: "/",
          element: <MainSection />,
          errorElement: <ErrorPage errorType="server" />
        },
        {
          path: "/pay",
          element: <PayPage />,
          errorElement: <ErrorPage errorType="payment" />
        },
        {
          path: "/shipping",
          element: <ShippingPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/return",
          element: <ReturnsPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/salesroom",
          element: <SalesroomPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/legal",
          element: <LegalPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/right",
          element: <RightOfWithdrawalPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/jobs",
          element: <JobsPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/tech",
          element: <TechTipsPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/brand",
          element: <BrandsPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/cart",
          element: (
            <AuthenticatedWrapper>
              <CartPage />
            </AuthenticatedWrapper>
          ),
          errorElement: <ErrorPage />
        },
        {
          path: "/checkout",
          element: (
            <AuthenticatedWrapper>
              <CheckoutPage />
            </AuthenticatedWrapper>
          ),
          errorElement: <ErrorPage />
        },
        {
          path: "/favorites",
          element: (
            <AuthenticatedWrapper>
              <FavoritesPage />
            </AuthenticatedWrapper>
          ),
          errorElement: <ErrorPage />
        },
        {
          path: "/garage",
          element: (
            <AuthenticatedWrapper>
              <GaragePage />
            </AuthenticatedWrapper>
          ),
          errorElement: <ErrorPage />
        },
        {
          path: "/account",
          element: (
            <AuthenticatedWrapper>
              <AccountPage />
            </AuthenticatedWrapper>
          ),
          errorElement: <ErrorPage />
        },
        {
          path: "/register",
          element: <RegisterPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/verify-code",
          element: <VerifyCodePage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/login",
          element: <LoginPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/verify-reset-code",
          element: <VerifyResetCodePage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/product/:id",
          element: <ProductPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/search-results",
          element: <SearchResults />,
          errorElement: <ErrorPage />
        },
        {
          path: "/category",
          element: <CategoryPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "/category/:id_category",
          element: <CategoryPage />,
          errorElement: <ErrorPage />
        },
        {
          path: "*",
          element: <NotFoundPage />
        },
        {
          path: "/error", 
          element: <ErrorPage errorType="server" />
        }
      ]
    }
  ],
  {
    onError: (error) => {
      console.error("Router error:", error);
    }
  }
);
