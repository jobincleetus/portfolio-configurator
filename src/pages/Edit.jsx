import { useSelector } from "react-redux";
import AddSections from "../components/AddSections";
import PrimaryContent from "../components/sections/PrimaryContent";
import imgPlaceHolder from "../assets/imgs/placeholder.png";
import PreviewNavigator from "../components/PreviewNavigator";

const Create = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-between gap-10 h-full py-10 fullScreen">
        <PreviewNavigator />
        <PrimaryContent />
        <AddSections />
      </div>
    </div>
  );
};

export default Create;
