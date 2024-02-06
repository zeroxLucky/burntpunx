const LANGUAGE = {
  MODAL: {
    DEFAULT: {
      title: (
        <div className="modal-title">
          <div className="text-xs mb-2 font-medium digital tracking-[.3em]">
            A Note From
          </div>
          <div className="cursive font-medium">The Hoodie Cartel</div>
        </div>
      ),
    },
    DISCLAIMER: {
      body: (
        <div className="border rounded-md p-6 text-justify leading-loose max-h-96 overflow-scroll bg-gray-300 text-black">
          By minting this NFT you are agreeing to be contractually obligated to
          burn it at a later date.Each NFT will be redeemable for one( 1 )
          limited edition gold trait (Gold Hoodies EXCLUDED) in the
          UniversalPunX decentralized application. You will have the choice to
          add above mentioned gold trait ( s ) to individual UniversalPunX or
          multiple gold traits to one UniversalPunX. The Hoodie Cartel reserves
          the right to expire this offer at any time, the attached ipfs image
          may also be terminated at any time. We do not condone trading of this
          NFT and there should be no expectation that this NFT should increase
          in value, for that reason we have applied a contract enforced 42%
          royalty. Mint accordingly degens.
        </div>
      ),
    },
    DESKTOP_ONLY: {
      body: (
        <div className="px-6  text-center">
          <div className="p-6 border rounded-md">
            Sorry for the inconvenience this mint is only available on desktop
          </div>
        </div>
      ),
    },
  },
};

export default LANGUAGE;
