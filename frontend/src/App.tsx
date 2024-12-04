import { Outlet } from "react-router-dom"
import { AsideMenu } from "./components/aside-menu/AsideMenu";

function App() {
  return (
    <div className="flex">
      <AsideMenu />
      <main className="md:mx-auto md:w-[68vw] md:ml-auto md:mr-0 px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
