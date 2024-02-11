/**
 * Global imports and interfaces for TypeScript.
 */
interface Window {
  ethereum: any;
  lukso: any;
}

type LSP3ProfileT = {
  key: string;
  name: string;
  value: {
    LSP3Profile: {
      name: string;
      description: string;
      tags: never[];
      links: {
        title: string;
        url: string;
      }[];
      profileImage: {
        width: number;
        height: number;
        url: string;
        verification: {
          verification: {
            method: string;
            data: string;
          };
        };
      }[];
      backgroundImage: {
        width: number;
        height: number;
        verification: {
          method: string;
          data: string;
        };
        url: string;
      }[];
    };
  };
};

type Token = {
  id: number;
  name: string;
  largePhoto: string;
  smallPhoto: string;
};
