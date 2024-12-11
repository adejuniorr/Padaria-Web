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
      className='bg-orange text-white text-lg font-bold rounded-full px-4 py-2 min-w-[300px] transition-all active:scale-90 active:shadow-none'
    >
      {children}
    </button>
  )
}
