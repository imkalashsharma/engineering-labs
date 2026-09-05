import { Button } from "../ui/button";
import { IconBrandGithubCopilot } from "@tabler/icons-react";
import type { ReactNode } from "react";

// types
interface SocialLinkFactoryProps {
  type: string;
  url: string;
}

interface LinkProps {
  type: string;
  url: string;
  img: ReactNode;
}

const SocialLinkFactory = ({ type, url }: SocialLinkFactoryProps) => {
  const icons = {
    github: <IconBrandGithubCopilot data-icon="inline-end" />,
  };

  if (type === "github")
    return <Link type={type} url={url} img={icons.github} />;

  return null;
};

const Link = ({ type, url, img }: LinkProps) => {
  return (
    <Button
      className="cursor-pointer"
      variant="outline"
      onClick={() => window.open(url, "_blank")}
      aria-label={type}
    >
      {img}
    </Button>
  );
};

export default SocialLinkFactory;
