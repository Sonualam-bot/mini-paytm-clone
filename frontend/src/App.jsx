// import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import Loader from "./components/Loader";
// const Signup = lazy(() => import("./pages/Signup"));
// const Signin = lazy(() => import("./pages/Signin"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const SendMoney = lazy(() => import("./pages/SendMoney"));
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import SendMoney from "./components/SendMoney";

function App() {
  return (
    <>
      {/* <Suspense fallback={<Loader />}> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
      {/* </Suspense> */}
    </>
  );
}

export default App;
