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
import { useDispatch } from "react-redux";
import { doGetAccountLogin } from "./redux/account/accountSlice";

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
    const getAccount = async () => {
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
            errorElement: <div>404 not found</div>,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "contact",
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

    return <RouterProvider router={router} />;
}
