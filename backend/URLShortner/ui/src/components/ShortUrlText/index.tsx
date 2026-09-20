import Text from "antd/es/typography/Text";

function ShortUrlText({ text }: { text: string }) {
  return (
    <>
      <div className="shortUrlText__header text-lg">Generated URL</div>

      <div className="shortUrlText">
        <Text className="bg-amber-100" copyable>
          {text}
        </Text>
      </div>
    </>
  );
}

export default ShortUrlText;
