import SocialLinkFactory from "./SocialLinkFactory";

import socialUrls from "../../resources/socialUrls.json";

const Footer = () => {
  const footer: string = `${new Date().getFullYear()} Canto. All rights reserved.`;

  return (
    <div className="footer flex flex-col items-center">
      <div className="footer__text text-xs text-gray-500 mb-5">{footer}</div>

      <div className="footer__socials flex gap-3">
        <SocialLinkFactory type="email" url={socialUrls.email} />
        <SocialLinkFactory type="linkedin" url={socialUrls.linkedin} />
        <SocialLinkFactory type="github" url={socialUrls.github} />
      </div>
    </div>
  );
};

export default Footer;
