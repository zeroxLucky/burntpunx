import Image from "next/image";
import xIcon from "../../util/icons/x.svg";
import discordIcon from "../../util/icons/discord.svg";
import commonGroundIcon from "../../util/icons/common-ground.svg";

const Footer = () => {
    return (
        <footer className="w-100 flex place-content-center justify-self-end p-12">
            <div className="flex flex-row justify-center items-center max-w-xs">
                <a className="w-100 max-w-12 p-3" target="_blank" href="https://twitter.com/hoodiecartel">
                    <Image src={xIcon} alt="logo" sizes="40px" objectFit="contain" />
                </a>
                <a className="w-100 max-w-12 p-3" target="_blank" href="https://discord.gg/hadpVYCEWr">
                    <Image
                        src={discordIcon}
                        alt="logo"
                        sizes="40px"
                        objectFit="contain"
                    />
                </a>
                <a className="w-100 max-w-12 p-3" target="_blank" href="https://app.cg/c/1EzCJWsy3p/">
                    <Image
                        src={commonGroundIcon}
                        alt="logo"
                        sizes="40px"
                        objectFit="contain"
                    />
                </a>
                <a className="w-100 max-w-12 p-3" target="_blank" href="https://twitter.com/universalpunx">
                    <Image src={xIcon} alt="logo" sizes="40px" objectFit="contain" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
