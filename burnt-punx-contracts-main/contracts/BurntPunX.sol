// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
/*
* BurntPunX smart contract
*/
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {
    LSP8IdentifiableDigitalAsset
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";
import {
    _LSP4_TOKEN_TYPE_NFT,
    _LSP4_METADATA_KEY
} from "@lukso/lsp-smart-contracts/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol";
import {
    _LSP8_TOKENID_FORMAT_NUMBER,
    _LSP8_TOKEN_METADATA_BASE_URI
} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";
import {ILSP7DigitalAsset as ILSP7} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

contract BurntPunX is LSP8IdentifiableDigitalAsset, ReentrancyGuard {

    uint256 public constant MAX_SUPPLY = 6900;
    uint256 public constant TEAM_RESERVE = 142;
    uint256 public constant MAX_MINTABLE = 100;
    uint256 public constant PRICE = 4.2 ether;
    uint256 public constant CHILLPRICE = 4200;
    address public authorizedAgent = address(0);
    address constant CHILL_TOKEN_ADDRESS = 0x5b8b0e44d4719f8a328470dccd3746bfc73d6b14
    bool public mintOpen = false;
    
    constructor() LSP8IdentifiableDigitalAsset(
        "Burnt PunX",
        "BPUNX",
        msg.sender,
        _LSP4_TOKEN_TYPE_NFT,
        _LSP8_TOKENID_FORMAT_NUMBER
        ) {
            authorizedAgent = msg.sender;
    }
    

    /// errors
    error BPunxMintingLimitExceeded(uint256 _amount);
    error BPunxMintingPriceNotMet(uint256 _amount);
    error Unauthorized();

    /// @dev Modifier to ensure caller is authorized operator
    modifier onlyAuthorizedAgent() {
        if (msg.sender != authorizedAgent && msg.sender != owner()) {
            revert Unauthorized();
        }
        _;
    }
    function mintTeamsAllocation(address _receiver) external onlyAuthorizedAgent {
        uint256 _totalSupply = totalSupply();
        require(_totalSupply < TEAM_RESERVE, "Team reserve already minted");
        for (uint256 i = 0; i < TEAM_RESERVE; i++) {
            uint256 tokenId = ++_totalSupply;
            _mint(_receiver, bytes32(tokenId), false, "");
        }
    }
    function mint(uint256 _amount) external payable nonReentrant {
        require(mintOpen, "Minting is not enabled");
        uint256 _totalSupply = totalSupply();
        if(_totalSupply + _amount > MAX_SUPPLY) revert BPunxMintingLimitExceeded(_amount);
        if(_amount > MAX_MINTABLE) revert BPunxMintingLimitExceeded(_amount);
        if(msg.value != PRICE * _amount) revert BPunxMintingPriceNotMet(_amount);
        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = ++_totalSupply;
            _mint(msg.sender,bytes32(tokenId), false, "");
        }
    }
    function chillMint() public external payable nonReentrant {
        require(mintOpen, "Minting is not enabled");
        uint256 _totalSupply = totalSupply();
        if(_totalSupply + _amount > MAX_SUPPLY) revert BPunxMintingLimitExceeded(_amount);
        if(_amount > MAX_MINTABLE) revert BPunxMintingLimitExceeded(_amount);

        ILSP7(CHILL_TOKEN_ADDRESS).transfer(
        // address from
        msg.sender,
        // address to
        authorizedAgent,
        // uint256 amount,
        CHILLPRICE,
        // bool force,
        false,
        // bytes memory data
        ""
        );
        if(msg.value != CHILLPRICE * _amount) revert BPunxMintingPriceNotMet(_amount);
        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = ++_totalSupply;
            _mint(msg.sender,bytes32(tokenId), false, "");
        }
    }
    function setAuthorizedAgent(address _authorizedAgent) external onlyOwner {
        authorizedAgent = _authorizedAgent;
    }
    function setMintStatus(bool _mintOpen) external onlyAuthorizedAgent {
        mintOpen = _mintOpen;
    }
    function setBaseURI(string memory _baseURI) external onlyAuthorizedAgent {
        bytes memory baseURI = bytes(_baseURI);
       _setData(_LSP8_TOKEN_METADATA_BASE_URI, bytes.concat(bytes8(0),baseURI));
    }
    function tokenSupplyCap() public view virtual returns (uint256) {
        return MAX_SUPPLY;
    }
    function withdraw() public onlyAuthorizedAgent {
        address payable to = payable(msg.sender);
        (bool success, ) = authorizedAgent.call{ value: address(this).balance }("");
        require(success, "Failed to send LYX");
        (bool success, ) = CHILL_TOKEN_ADDRESS.call{ value: CHILL_TOKEN_ADDRESS.balanceOf(authorizedAgent) }("");
        require(success, "Failed to send CHILL");
    }
    receive() external payable {}
}
