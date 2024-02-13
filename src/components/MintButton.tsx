"use client";

import { useAccount } from "wagmi";
import { useMinter } from "./contexts/MinterContext";
import { getEthersSigner } from "@/utils/client";
import { config } from "@/config/wagmi";
import { ethers } from "ethers";
import { chill_address, contract_address } from "@/config/consts";
import abi from "@/config/abi.json";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader } from "@/utils/icons/loader";
import lsp7 from "@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json";

const MintButton = () => {
  const account = useAccount();
  const { count, chill, setFrameImage } = useMinter();
  const [isPending, startTransition] = useTransition();

  const mint = () => {
    startTransition(async () => {
      setFrameImage("");
      try {
        const total = parseInt(count) * 4.2;
        const provider = await getEthersSigner(config);
        const contract = new ethers.Contract(
          contract_address,
          abi.abi,
          provider
        );
        await contract
          .mint(ethers.toBigInt(parseInt(count)), {
            gasLimit: 300000,
            value: ethers.parseEther(`${total}`),
          })
          .then(async (receipt) => {
            toast.success("Minted!");
            await new Promise((resolve) => setTimeout(resolve, 10000));
            const tokens = await contract.tokenIdsOf(account.address);
            const token = tokens[tokens.length - 1];
            setFrameImage(
              `https://ipfs.io/ipfs/QmSKbCkmib8koVyYA2Xum3hngzNCLVijFkiQBg23VHjcMV/BurntPunX_${parseInt(
                token
              )}.png`
            );
          })
          .catch((e) => {
            toast.error("Error minting");
          });
      } catch (e) {
        return;
      }
    });
  };

  const chillMint = () => {
    startTransition(async () => {
      setFrameImage("");
      try {
        const total = parseInt(count) * 6969;
        const provider = await getEthersSigner(config);
        const access = new ethers.Contract(chill_address, lsp7.abi, provider);

        try {
          await access.authorizeOperator(
            contract_address,
            ethers.parseEther(`${total}`),
            "0x"
          );
        } catch (e) {
          toast.error("Error authorizing chill");
          return;
        }

        const contract = new ethers.Contract(
          contract_address,
          abi.abi,
          provider
        );
        await contract
          .chillMint(ethers.toBigInt(parseInt(count)), {
            gasLimit: 300000,
          })
          .then(async (receipt) => {
            toast.success("Minted!");
            await new Promise((resolve) => setTimeout(resolve, 10000));
            const tokens = await contract.tokenIdsOf(account.address);
            const token = tokens[tokens.length - 1];
            setFrameImage(
              `https://ipfs.filebase.io/ipfs/QmSKbCkmib8koVyYA2Xum3hngzNCLVijFkiQBg23VHjcMV/BurntPunX_${token}.png`
            );
          })
          .catch((e) => {
            toast.error("Error minting");
          });
      } catch (e) {
        return;
      }
    });
  };

  if (account.isConnected) {
    return (
      <>
        <button
          onClick={chill ? chillMint : mint}
          disabled={isPending}
          className="max-h-12 digital text-sm tracking-widest gap-1 grow p-2 text-center border text-gold col-span-4 rounded-md flex items-center justify-center"
        >
          Mint{" "}
          {isPending ? (
            <Loader className="text-gold animate-spin w-3 h-3" />
          ) : (
            <div className="status bg-green-600 mb-1" />
          )}
        </button>
      </>
    );
  }

  return (
    <div className="max-h-12 digital text-sm tracking-widest gap-1 grow p-2 text-center border border-blue text-blue col-span-4 rounded-md flex items-center justify-center">
      Mint <div className="status bg-red-500 mb-1" />
    </div>
  );
};

export default MintButton;
