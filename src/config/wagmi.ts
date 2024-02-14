import { http, createConfig } from "wagmi";
import { lukso } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [lukso],
  multiInjectedProviderDiscovery: false,
  connectors: [
    injected({
      // force lukso provider `Universal Profile`
      // @ts-expect-error
      target() {
        return {
          id: "windowProvider",
          name: "Window Provider",
          provider(window?: Window) {
            return window?.lukso;
          },
        };
      },
    }),
  ],
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
