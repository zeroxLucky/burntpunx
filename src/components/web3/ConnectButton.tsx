// import { useEthereum } from './contexts/EthereumContext'
"use client";
import Button from "@/components/common/Button";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectButton() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (account.isConnected) {
    return <Button onPress={() => disconnect()} label="Disconnect" />;
  }

  return connectors.map((connector) => (
    <Button
      key={connector.uid}
      onPress={() => connect({ connector })}
      label="Connect"
    />
  ));
}
