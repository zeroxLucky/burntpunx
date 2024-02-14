"use client";

import ConnectButton from "@/components/ConnectButton";
import Button from "@/components/ui/Button";
import { admin_address, contract_address } from "@/config/consts";
import { config } from "@/config/wagmi";
import { getEthersSigner } from "@/utils/web3";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import abi from "@/config/abi.json";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader } from "@/utils/icons/loader";

export default function AdminPage() {
  const account = useAccount();

  if (account?.address !== admin_address) {
    return (
      <div className="digital text-gold flex flex-col items-center gap-4">
        <h1>You&apos;re not supposed to be here</h1>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="digital text-gold flex flex-col items-center gap-4">
      <h1>Admin Page</h1>
      <EnableMintButton />
      <DisableMintButton />
      <Withdraw />
      <MintAllocation address={account.address} />
      <ConnectButton />
    </div>
  );
}

const EnableMintButton = () => {
  const [isPending, startTransition] = useTransition();

  const enableMint = () => {
    startTransition(async () => {
      try {
        const provider = await getEthersSigner(config);
        const contract = new ethers.Contract(
          contract_address,
          abi.abi,
          provider
        );
        await contract
          .setMintStatus(true, {
            gasLimit: 1000000,
          })
          .then((receipt) => {
            toast.success("Mint Enabled");
          })
          .catch((e) => {
            toast.error("Error enabling mint");
          });
      } catch (e) {
        return;
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onPress={enableMint}
      classNames="flex flex-row gap-2 items-center w-64 justify-center"
    >
      {isPending && <Loader className="text-gold animate-spin" />}
      <span>Enable Mint</span>
    </Button>
  );
};

const DisableMintButton = () => {
  const [isPending, startTransition] = useTransition();

  const disableMint = () => {
    startTransition(async () => {
      try {
        const provider = await getEthersSigner(config);
        const contract = new ethers.Contract(
          contract_address,
          abi.abi,
          provider
        );
        await contract
          .setMintStatus(false, {
            gasLimit: 1000000,
          })
          .then((receipt) => {
            toast.success("Mint Disabled");
          })
          .catch((e) => {
            toast.error("Error disabling mint");
          });
      } catch (e) {
        return;
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onPress={disableMint}
      classNames="flex flex-row gap-2 items-center w-64 justify-center"
    >
      {isPending && <Loader className="text-gold animate-spin" />}
      <span>Disable Mint</span>
    </Button>
  );
};

const Withdraw = () => {
  const [isPending, startTransition] = useTransition();

  const withdraw = () => {
    startTransition(async () => {
      try {
        const provider = await getEthersSigner(config);
        const contract = new ethers.Contract(
          contract_address,
          abi.abi,
          provider
        );
        await contract
          .withdraw({
            gasLimit: 1000000,
          })
          .then((receipt) => {
            toast.success("Successfully withdrawn");
          })
          .catch((e) => {
            toast.error("Error withdrawing funds");
          });
      } catch (e) {
        return;
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onPress={withdraw}
      classNames="flex flex-row gap-2 items-center w-64 justify-center"
    >
      {isPending && <Loader className="text-gold animate-spin" />}
      <span>Withdraw</span>
    </Button>
  );
};

const MintAllocation = ({ address }: { address: string }) => {
  const [isPending, startTransition] = useTransition();

  const mintAllocation = () => {
    startTransition(async () => {
      try {
        const provider = await getEthersSigner(config);
        const contract = new ethers.Contract(
          contract_address,
          abi.abi,
          provider
        );
        await contract
          .mintTeamsAllocation(address, {
            gasLimit: 2000000,
          })
          .then((receipt) => {
            toast.success("Success");
          })
          .catch((e) => {
            toast.error("Error");
          });
      } catch (e) {
        return;
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onPress={mintAllocation}
      classNames="flex flex-row gap-2 items-center w-64 justify-center"
    >
      {isPending && <Loader className="text-gold animate-spin" />}
      <span>Mint Allocation</span>
    </Button>
  );
};
