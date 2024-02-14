// import { useEthereum } from './contexts/EthereumContext'
"use client";
import Button from "@/components/ui/Button";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectButton() {
  // wagmi hooks for connecting wallet
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (account.isConnected) {
    return <Button onPress={() => disconnect()} label="Disconnect" />;
  }

  if (connectors.length === 0) {
    return <div>No wallets available</div>;
  }

  return (
    <Button
      key={connectors[0].uid}
      onPress={() => connect({ connector: connectors[0] })}
      label="Connect Wallet"
    />
  );
}
