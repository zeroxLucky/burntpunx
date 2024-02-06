import { ethers } from "hardhat";
import hre from "hardhat";
const networkName = hre.network.name
async function main() {

  const burntPunX = await ethers.deployContract("BurntPunX");

  await burntPunX.waitForDeployment();

  console.log(
    `BurntPunX with deployed to ${burntPunX.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

