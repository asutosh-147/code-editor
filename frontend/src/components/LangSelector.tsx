import Tooltip from "./ui/Tooltip";
// import { supportedlangs, SupportedLangsType } from "@/lib/constants";
import { useRecoilValue } from "recoil";
import { langAtom } from "@/store/atoms/editor";
import Button from "./ui/Button";

const LangSelector = () => {
  const lang = useRecoilValue(langAtom);
  return (
    <div className="group relative">
      <Button className="capitalize py-[0.3rem]">
        {lang}
      </Button>
      <Tooltip position="top" title="Language" />
    </div>
  );
};

export default LangSelector;
