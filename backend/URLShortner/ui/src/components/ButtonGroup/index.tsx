import { Button } from "antd";

function ButtonGroup({
  url,
  onSubmit,
  onReset,
  isPending,
}: {
  url: string;
  onSubmit: () => void;
  onReset: () => void;
  isPending: boolean;
}) {
  return (
    <div className="buttonGroup flex gap-2">
      <div className="buttonGroup__submit">
        <Button
          disabled={!url.trim()}
          loading={isPending}
          variant="solid"
          color="green"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>

      <div className="buttonGroup__reset">
        <Button
          disabled={isPending}
          variant="solid"
          color="red"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default ButtonGroup;
