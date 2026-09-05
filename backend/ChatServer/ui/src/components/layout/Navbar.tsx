import SocialLinkFactory from "./SocialLinkFactory";

import socialUrls from "../../resources/socialUrls.json";

const Banner = () => {
  const imgSrc: string = "/icon_128.png";

  return (
    <div className="banner flex gap-5">
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
    <div className="navbar flex items-center justify-between">
      <div className="navbar__banner">
        <Banner />
      </div>

      <div className="navbar__links justify-self-end">
        <SocialLinkFactory type="github" url={socialUrls.github_canto} />
      </div>
    </div>
  );
};

export default Navbar;
