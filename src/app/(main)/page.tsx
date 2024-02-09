import Frame from "@/components/layout/Frame";
import MintDisplay from "@/components/layout/MintDisplay";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";
import { MinterProvider } from "@/components/contexts/MinterContext";

export default function Page() {
  return (
    <div className="gap-3 flex flex-1 flex-col px-6 w-full max-w-sm h-full">
      <MinterProvider>
        <Frame />
        <MintDisplay />
        <ConnectButton />
        <Link
          href="/gallery"
          className="max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center text-gold"
        >
          VIEW OWNED
        </Link>
      </MinterProvider>
    </div>
  );
}
