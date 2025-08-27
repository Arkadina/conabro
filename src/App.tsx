import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import HowItWorks from "./routes/howitworks";
import Evaluation from "./routes/evaluation";
import Thanks from "./routes/thanks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  {
    path: "/evaluation",
    element: <Evaluation />,
  },
  {
    path: "/thanks",
    element: <Thanks />,
  },
]);

export default router;
