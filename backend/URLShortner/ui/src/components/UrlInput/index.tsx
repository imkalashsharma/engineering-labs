import { Col, Input, Row } from "antd";

function UrlInput({
  url,
  setUrl,
}: {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Row>
      <Col span={8}>
        <div className="urlInput">
          <div className="urlInput__input">
            <Input
              size="large"
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.google.com"
              value={url}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default UrlInput;
