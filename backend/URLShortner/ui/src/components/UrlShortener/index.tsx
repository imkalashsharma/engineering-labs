import { useState } from "react";
import UrlInput from "../UrlInput";
import ButtonGroup from "../ButtonGroup";
import ShortUrlText from "../ShortUrlText";
import { useShortenUrl } from "../../hooks/useShortenUrl";

function UrlShortener() {
  // states
  const [url, setUrl] = useState<string>("");

  const { mutate, data, isPending, error, reset } = useShortenUrl();

  if (error || data?.isError) {
    console.error("Mutation failed:", error);

    return (
      <div className="text-red-500">
        An Error Occured. Something went wrong.
      </div>
    );
  }

  const onSubmit: () => void = () => {
    if (!url.trim()) return;
    mutate(url);
  };

  const onReset: () => void = () => {
    setUrl("");
    reset();
  };

  return (
    <div className="urlShortener">
      <div className="urlShortener__input my-3">
        <UrlInput url={url} setUrl={setUrl} />
      </div>

      <div className="urlShortener my-4">
        <ButtonGroup
          url={url}
          onSubmit={onSubmit}
          onReset={onReset}
          isPending={isPending}
        />
      </div>

      {data && (
        <div className="urlShortener mt-6">
          <ShortUrlText text={data.data.url} />
        </div>
      )}
    </div>
  );
}

export default UrlShortener;
