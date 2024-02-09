// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
/*
* BurntPunX smart contract
*/
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {
    LSP8IdentifiableDigitalAsset
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";
import { LSP8Enumerable  } from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol";
import {
    _LSP4_TOKEN_TYPE_NFT,
    _LSP4_METADATA_KEY
} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";
import {
    _LSP8_TOKENID_FORMAT_NUMBER,
    _LSP8_TOKEN_METADATA_BASE_URI
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";
import { LSP8IdentifiableDigitalAssetCore } from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol";
import {ILSP7DigitalAsset as ILSP7} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

/// errors
error BPunxMintingLimitExceeded(uint256 _amount);
error BPunxMintingPriceNotMet(uint256 _amount);
error Unauthorized();

contract BurntPunX is LSP8IdentifiableDigitalAsset, LSP8Enumerable, ReentrancyGuard {

    uint256 public constant MAX_SUPPLY = 6900;
    uint256 public constant TEAM_RESERVE = 142;
    uint256 public constant MAX_MINTABLE = 100;
    uint256 public constant PRICE = 4.2 ether;
    uint256 public constant CHILLPRICE = 4200;

    address constant CHILL_TOKEN_ADDRESS = 0x5B8B0E44D4719F8A328470DcCD3746BFc73d6B14;
    bool public mintOpen = false;

    ILSP7 _chillContract;
    
    constructor() LSP8IdentifiableDigitalAsset(
        "Burnt PunX",
        "BPUNX",
        msg.sender,
        _LSP4_TOKEN_TYPE_NFT,
        _LSP8_TOKENID_FORMAT_NUMBER
        ) {
            _chillContract = ILSP7(CHILL_TOKEN_ADDRESS);
    }


    modifier isMintOpen(){
        require(mintOpen, "Minting is not enabled");
        _;
    }
    
    function mintTeamsAllocation(address _receiver) external onlyOwner {
        uint256 _totalSupply = totalSupply();
        require(_totalSupply < TEAM_RESERVE, "Team reserve already minted");
        for (uint256 i = 0; i < TEAM_RESERVE; i++) {
            uint256 tokenId = ++_totalSupply;
            _mint(_receiver, bytes32(tokenId), false, "");
        }
    }
    function mint(uint256 _amount) external payable nonReentrant isMintOpen {
        uint256 _totalSupply = totalSupply();
        if(_totalSupply + _amount > MAX_SUPPLY) revert BPunxMintingLimitExceeded(_amount);
        if(_amount > MAX_MINTABLE) revert BPunxMintingLimitExceeded(_amount);
        if(msg.value != PRICE * _amount) revert BPunxMintingPriceNotMet(_amount);
        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = ++_totalSupply;
            _mint(msg.sender,bytes32(tokenId), false, "");
        }
    }
    function chillMint(uint256 _amount) external payable nonReentrant isMintOpen {
        uint256 _totalSupply = totalSupply();
        if(_totalSupply + _amount > MAX_SUPPLY) revert BPunxMintingLimitExceeded(_amount);
        if(_amount > MAX_MINTABLE) revert BPunxMintingLimitExceeded(_amount);

        _chillContract.transfer(
        // address from
        msg.sender,
        // address to
        owner(),
        // uint256 amount,
        (CHILLPRICE * _amount),
        // bool force,
        false,
        // bytes memory data
        ""
        );

        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = ++_totalSupply;
            _mint(msg.sender,bytes32(tokenId), false, "");
        }
    }
    function setMintStatus(bool _mintOpen) external onlyOwner {
        mintOpen = _mintOpen;
    }
    function setBaseURI(string memory _baseURI) external onlyOwner {
        bytes memory baseURI = bytes(_baseURI);
       _setData(_LSP8_TOKEN_METADATA_BASE_URI, bytes.concat(bytes8(0),baseURI));
    }
    function withdraw() external onlyOwner {
        (bool successLyx, ) = payable(msg.sender).call{ value: address(this).balance }("");
        require(successLyx, "Failed to send LYX");
    }
    function _beforeTokenTransfer(
        address from,
        address to,
        bytes32 tokenId,
        bytes memory data
    ) internal virtual override(LSP8Enumerable, LSP8IdentifiableDigitalAssetCore)
    {
        super._beforeTokenTransfer(from, to, tokenId, data);
    } 
}