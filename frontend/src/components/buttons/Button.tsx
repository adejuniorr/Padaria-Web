type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='bg-orange text-white text-lg font-bold rounded-md px-4 py-2'
    >
      {children}
    </button>
  )
}
