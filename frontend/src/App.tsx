import { Outlet } from "react-router-dom"
import { MobileMenu } from "./components/nav-menus/MobileMenu"

function App() {
  const viewport = window.innerWidth;

  return (
    <>
      {
        viewport < 1024 ? (
          <MobileMenu />
        ) : (
          <h1>Desktop
          </h1>
      )}
      <Outlet />
    </>
  )
}

export default App
