import Loader from "./ui/Loader";
import TextArea from "./TextArea";

type OutputProps = {
  output: string;
  loading: boolean;
};
const Output = ({ output, loading }: OutputProps) => {
  return (
    <div className="flex flex-col gap-1 row-span-2">
      <div className="font-bold tracking-wide">Ouput</div>
      {loading ? (
        <div className="h-full bg-zinc-900">
          <Loader />
        </div>
      ) : (
        <TextArea
          text={output}
          name="input"
          id="input"
          disabled
          className="placeholder:text-zinc-200"
        />
      )}
    </div>
  );
};

export default Output;
