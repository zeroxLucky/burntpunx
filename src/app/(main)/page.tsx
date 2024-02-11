import Frame from "@/components/layout/Frame";
import MintDisplay from "@/components/layout/MintDisplay";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";
import { MinterProvider } from "@/components/contexts/MinterContext";
import CollectionButton from "@/components/CollectionButton";

export default function Page() {
  return (
    <div className="gap-3 flex flex-1 flex-col px-6 w-full max-w-sm h-full">
      <MinterProvider>
        <Frame />
        <MintDisplay />
        <ConnectButton />
        <CollectionButton />
      </MinterProvider>
    </div>
  );
}
