import Race from "./routes/Race";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "routes/ErrorPage";
import Landing from "routes/Landing";
import Root from "routes/Root";
import LoadingPage from "routes/LoadingPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/AFR-phaser3-react/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Landing />
        },
        {
          path: "races/:race",
          element: <Race />
        },
        {
          path: "loading",
          element: <LoadingPage />
      }
      ]
    }
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;