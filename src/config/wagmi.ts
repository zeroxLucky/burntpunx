import { http, createConfig } from "wagmi";
import { lukso } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [lukso],
  multiInjectedProviderDiscovery: false,
  connectors: [injected()],
  ssr: true,
  transports: {
    [lukso.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
