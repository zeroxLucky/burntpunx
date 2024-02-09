import { http, createConfig } from "wagmi";
import { lukso } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { type Chain } from "viem";
import { type InjectedParameters } from "@wagmi/connectors";

export const luksotest = {
  id: 4201,
  name: "LUKSO Testnet",
  nativeCurrency: {
    name: "LUKSO",
    symbol: "	LYXt",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lukso.network"],
      webSocket: ["wss://ws-rpc.testnet.lukso.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "LUKSO Testnet Explorer",
      url: "https://explorer.execution.testnet.lukso.network",
      apiUrl: "https://explorer.execution.mainnet.lukso.network/api",
    },
  },
} as const satisfies Chain;

export const config = createConfig({
  chains: [luksotest, lukso],
  multiInjectedProviderDiscovery: false,
  connectors: [
    injected({
      target() {
        return {
          id: "4201",
          name: "Universal Profile",
          provider(window) {
            return (window as any).lukso;
          },
        };
      },
    }),
  ],
  ssr: true,
  transports: {
    [luksotest.id]: http(),
    [lukso.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
