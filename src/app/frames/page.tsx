import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import FrameBox from "@/components/FrameBox";

export const metadata: Metadata = {
  title:
    "PostCreator",
  description: "This is Next.js Frame page for PostCreator Dashboard Kit",
};

const Frames = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <Breadcrumb pageName="Frames" />

        <FrameBox />
      </div>
    </DefaultLayout>
  );
};

export default Frames;
