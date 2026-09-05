const Banner = () => {
  const imgSrc: string = "/icon_128.png";

  return (
    <div className="banner flex gap-5 mb-3">
      <div className="banner__icon flex flex-col justify-center">
        <img className="w-8" src={imgSrc} alt="canto icon" />
      </div>

      <div className="banner__label flex flex-col">
        <div className="banner__label__header text-lg font-semibold">Canto</div>

        <div className="banner__label__subheader text-sm">
          Real-time distributed chat laboratory
        </div>
      </div>
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
