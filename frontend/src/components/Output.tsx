import Loader from "./ui/Loader";
import TextArea from "./TextArea";

type OutputProps = {
  output: string;
  loading: boolean;
};
const Output = ({ output, loading }: OutputProps) => {
  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="font-bold tracking-wide absolute top-1 right-2">Ouput</div>
      {loading ? (
        <div className="h-full bg-gray-50 rounded-md dark:bg-zinc-900">
          <Loader />
        </div>
      ) : (
        <TextArea
          text={output}
          name="input"
          id="input"
          disabled
          className="placeholder:text-zinc-200 font-semibold rounded-t-none rounded-bl-none"
        />
      )}
    </div>
  );
};

export default Output;
