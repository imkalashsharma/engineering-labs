const Banner = () => {
  const imgSrc: string = "/icon_128.png";

  return (
    <div className="banner flex align-center gap-3 mb-3">
      <div className="banner__icon">
        <img className="w-8 h-8" src={imgSrc} alt="canto icon" />
      </div>

      <div className="banner__label text-lg font-medium">Canto</div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="navbar p-4">
      <div className="navbar__banner">
        <Banner />
      </div>
    </div>
  );
};

export default Navbar;
