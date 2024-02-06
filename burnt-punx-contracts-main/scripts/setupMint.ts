import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import { BurntPunX } from "../typechain-types";
import hre from "hardhat";
const networkName = hre.network.name
dotenv.config();
const contractAddress = networkName == 'mainnet' ? process.env.CONTRACT || '' : process.env.TEST_CONTRACT || '';
let burntPunX: BurntPunX;

async function main() {
    const burntPunXFacotry = await ethers.getContractFactory("BurntPunX");
    burntPunX = burntPunXFacotry.attach(contractAddress) as BurntPunX;
    
    const tx = await burntPunX.setMintStatus(true)
    .catch((error) => {
        console.error(error);
    });
    console.log('tx: ', tx);        

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});