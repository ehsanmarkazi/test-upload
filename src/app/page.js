import Image from "next/image";
import ModelViewer from "./components/template/ModelViewer";

export default function Home() {
  return (
    <div className="flex h-screen flex-row items-center justify-between overflow-clip">
     <ModelViewer url="/scene.glb"/>
     <div className="w-[50%] bg-purple-200 min-h-screen overflow-y-scroll">
     
     </div>
    </div>
  );
}
