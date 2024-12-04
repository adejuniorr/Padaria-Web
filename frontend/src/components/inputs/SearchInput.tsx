import { CiSearch } from "react-icons/ci"

export const SearchInput = () => {
  return (
    <span className='flex gap-2 shadow-custom-01 rounded-md px-4 py-3 bg-white mb-6'>
      <input type="text" placeholder='Pesquisar por nome' className='w-full outline-none' />
      <CiSearch className='text-2xl' />
    </span>
  )
}
