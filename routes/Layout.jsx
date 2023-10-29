import { Outlet } from "react-router-dom";
import NavBar from "../src/Components/NavBar";

const Layout = () => {
  return (
    <div className="whole-page">
      
      <div className='app-sider'>
        <header className="app-header">
          <h1> Recipe LookUp </h1>
        </header>
        <NavBar />
      </div>
        <Outlet />
    </div>
  );
};

export default Layout;