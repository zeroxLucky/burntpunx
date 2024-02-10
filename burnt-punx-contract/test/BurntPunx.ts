import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { BurntPunX, TokenReceiverWithLSP1 } from "../typechain-types";

describe("BurntPunx", function () {
    let owner: Signer;
    let addr1: Signer;
    let agent: Signer;
    let burntPunX: BurntPunX;
    let upMock: TokenReceiverWithLSP1;

    beforeEach(async function () {
        [owner, addr1, agent] = await ethers.getSigners();
        const BurntPunX = await ethers.getContractFactory("BurntPunX");
        burntPunX = await BurntPunX.deploy();
        const TokenReceiverWithLSP1 = await ethers.getContractFactory("TokenReceiverWithLSP1");
        upMock = await TokenReceiverWithLSP1.deploy();
    });
    describe("Minting", function () {
        it("Should mint the teams allocation", async function () {
            const upMockAddress = await upMock.getAddress();
            await burntPunX.mintTeamsAllocation(upMockAddress);
            expect(await burntPunX.totalSupply()).to.equal(142);
        });
        it("Should mint a 100 tokens", async function () {
            await burntPunX.setMintStatus(true);
            const burntPunXAddress = await burntPunX.getAddress();
            await upMock.connect(owner).mint(burntPunXAddress, 100n, { value: ethers.parseEther("420") });
            expect(await burntPunX.totalSupply()).to.equal(100);
        });
    });
    describe("Restrictions", function () {
        it("Should not mint the teams allocation if not the owner or authorized agent", async function () {
            const upMockAddress = await upMock.getAddress();
            await expect(burntPunX.connect(addr1).mintTeamsAllocation(upMockAddress)).to.be.revertedWithCustomError(burntPunX, "Unauthorized");
        });
        it("Should not mint tokens if minting is not enabled", async function () {
            const burntPunXAddress = await burntPunX.getAddress();
            await expect(upMock.connect(owner).mint(burntPunXAddress, 100n, { value: ethers.parseEther("420") })).to.be.revertedWith("Minting is not enabled");
        });
        it("Should not mint tokens if the value is not 420", async function () {
            await burntPunX.setMintStatus(true);
            const burntPunXAddress = await burntPunX.getAddress();
            await expect(upMock.connect(owner).mint(burntPunXAddress, 100n, { value: ethers.parseEther("100") })).to.be.revertedWithCustomError(burntPunX,"BPunxMintingPriceNotMet").withArgs(100n);
        });
    });
});