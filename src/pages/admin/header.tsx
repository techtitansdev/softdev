interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <>
      <div
        className="
    h-fit
    border-black
    border-b-2
    p-6
    "
      >
        <div
          className="
        mt-12
         text-3xl 
         font-medium
          text-gray-800
          "
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Header;
