const key = '0x1a7628600c3bac7101f53697f48df381ddc36b9015e7d7c9c5633d1252aa2843';

import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import { BurntPunX } from "../typechain-types";
import hre from "hardhat";
const networkName = hre.network.name
dotenv.config();
const contractAddress = networkName == 'mainnet' ? process.env.CONTRACT || '' : process.env.TEST_CONTRACT || '';
let burntPunX: BurntPunX;
const metadata = 'ipfs://some-cid/';

async function main() {
    const burntPunXFacotry = await ethers.getContractFactory("BurntPunX");
    burntPunX = burntPunXFacotry.attach(contractAddress) as BurntPunX;
    const tokenUriHex = ethers.hexlify(ethers.toUtf8Bytes(metadata));
    const tx = await burntPunX.setData(key, tokenUriHex)
    .catch((error) => {
        console.error(error);
    });
    console.log('tx: ', tx);        

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});