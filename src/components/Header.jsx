

const Header = ({ title, logo }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-brand d-flex justify-content-center align-items-center">
            <a href="/"><img src={logo} alt="Logo" width="30" height="30" className="me-2" /></a>
            <h1 className="title">{title}</h1>
        </div>
        
      </div>
    </nav>
  );
}

export default Header;
