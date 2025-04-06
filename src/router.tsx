import {createBrowserRouter, createRoutesFromElements, Route} from "react-router";
import * as React from "react";
import {Suspense} from "react";

const Loader = React.lazy(() => import("@/pages/loader/loader"));
const Login = React.lazy(() => import("@/pages/auth/login"));
const SignUp = React.lazy(() => import("@/pages/auth/signup"));
const LandingPage = React.lazy(() => import("@/pages/landing-page/landing-page"));

export const ProtectedRoute = ({children}: any) => {
    // const auth = useHookstate(authState);
    // if (!auth.get({ stealth: true })) {
    //   // user is not authenticated
    //   return <Navigate to="/login" />;
    // }
    // return children;
};

export const ProtectedRouteLogin = ({children}: any) => {
    // const auth = useHookstate(authState);
    // if (auth.get({ stealth: true })) {
    //   // user is not authenticated
    //   return <Navigate to="/" />;
    // }
    // return children;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/login"
                element={
                    <Suspense fallback={<Loader/>}>
                        <Login/>
                    </Suspense>
                }
            />
            <Route
                path="/signup"
                element={
                    <Suspense fallback={<Loader/>}>
                        <SignUp/>
                    </Suspense>
                }
            />
            <Route
                path="/"
                element={
                    <Suspense fallback={<Loader/>}>
                        <LandingPage/>
                    </Suspense>
                }
            />
        </>
    )
);
