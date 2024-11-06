import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import Home from "./components/home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountLogin } from "./redux/account/accountSlice";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import LayoutAdmin from "./components/admin/AdminLayout";
import "./styles/reset.scss";

const Layout = () => {
    return (
        <>
            <div>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );

    const getAccount = async () => {
        if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/register"
        )
            return;

        const res = await callFetchAccount();

        dispatch(doGetAccountLogin(res.data.user));
    };
    useEffect(() => {
        getAccount();
    }, []);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "users",
                    element: <ContactPage />,
                },
                {
                    path: "book",
                    element: <BookPage />,
                },
            ],
        },
        {
            path: "/admin",
            element: <LayoutAdmin />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "user",
                    element: <ContactPage />,
                },
                {
                    path: "book",
                    element: <BookPage />,
                },
            ],
        },

        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);

    return (
        <>
            {isAuthenticated === true ||
            window.location.pathname === "/login" ||
            window.location.pathname === "/register" ||
            window.location.pathname === "/" ? (
                <RouterProvider router={router} />
            ) : (
                <Loading />
            )}
        </>
    );
}
