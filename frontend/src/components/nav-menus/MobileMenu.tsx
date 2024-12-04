import { useState } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { MdOutlineMenuOpen } from "react-icons/md"
import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom"

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="fixed">
      <div onClick={toggleMenu} className="absolute top-6 bg-orange text-white text-3xl w-fit p-2 rounded-e-md shadow-sm shadow-gray-500">
        <MdOutlineMenuOpen />
      </div>
      <div className={`absolute z-20 flex flex-col gap-8 p-2 bg-orange shadow-xl shadow-gray-900 w-[90vw] h-screen transition-all duration-500 ${open ? "" : "-translate-x-[100vw]"}`}>
        <FaXmark className="text-4xl text-white self-end" onClick={toggleMenu} />
        <nav>
          <ul className="flex flex-col gap-4 ">
            <li className="w-full border-2 bg-white text-brown shadow-custom-01 border-white rounded-md p-3">
              <Link to="/" onClick={toggleMenu} className="flex items-center gap-4 font-bold">
                <PiHouseBold className="text-xl" /> Estoque
              </Link>
            </li>
            <li className="w-full border-2 bg-white text-brown shadow-custom-01 border-white rounded-md p-3">
              <Link to="/novo" onClick={toggleMenu} className="flex items-center gap-4 font-bold">
                <FaPlus className="text-lg" /> Cadastrar Novo Produto
              </Link>
            </li>
            <li className="w-full border-2 bg-white text-brown shadow-custom-01 border-white rounded-md p-3">
              <Link to="/relatório" onClick={toggleMenu} className="flex items-center gap-4 font-bold">
                <FaArrowRight className="text-lg" /> Gerar Relatório de Vendas
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
