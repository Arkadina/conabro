import "./App.css";
import { createHashRouter } from "react-router-dom";
import Home from "./routes/home";
import HowItWorks from "./routes/howitworks";
import Evaluation from "./routes/evaluation";
import Thanks from "./routes/thanks";

const router = createHashRouter([
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
