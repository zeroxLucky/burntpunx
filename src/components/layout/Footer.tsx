import Image from "next/image";
import xIcon from "@/utils/icons/x.svg";
import discordIcon from "@/utils/icons/discord.svg";
import commonGroundIcon from "@/utils/icons/common-ground.svg";

const Footer = () => {
  return (
    <footer className="w-full flex place-content-center p-3 justify-self-end">
      <div className="flex flex-row justify-center items-center max-w-xs self-center">
        <a
          className="w-100 max-w-12 p-3"
          target="_blank"
          href="https://twitter.com/hoodiecartel"
        >
          <Image
            src={xIcon}
            alt="x icon"
            sizes="40px"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </a>
        <a
          className="w-100 max-w-12 p-3"
          target="_blank"
          href="https://discord.gg/hadpVYCEWr"
        >
          <Image
            src={discordIcon}
            alt="discord icon"
            sizes="40px"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </a>
        <a
          className="w-100 max-w-12 p-3"
          target="_blank"
          href="https://app.cg/c/1EzCJWsy3p/"
        >
          <Image
            src={commonGroundIcon}
            alt="commond ground icon"
            sizes="40px"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </a>
        <a
          className="w-100 max-w-12 p-3"
          target="_blank"
          href="https://twitter.com/universalpunx"
        >
          <Image
            src={xIcon}
            alt="x icon"
            sizes="40px"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
