import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="d-flex flex-row justify-content-center mb-4">
        {" "}
        <Nav currentPage={location.pathname} />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
