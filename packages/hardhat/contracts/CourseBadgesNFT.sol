pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import 'base64-sol/base64.sol';

contract CourseBadgesNFT is ERC721Enumerable {
    using Strings for uint256;
    address public allowedMinter;

    constructor(address _creator) ERC721("Staking Course Badges", "SCB") {
        allowedMinter = _creator;
    }

    mapping(uint256 => uint256) badgeIdForStep;

    function mint(address _to, uint256 _stepNumber) external {
        require(msg.sender == allowedMinter, "Not allowed to mint");
        _mint(_to, totalSupply());
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        require(_exists(id), "Token Id doesn't exist");
        string memory name = string(abi.encodePacked('Staking Course Badge#', id.toString()));
        string memory description = string(abi.encodePacked('Staked Education'));
        string memory image = Base64.encode(bytes(generateSVGofTokenById(id)));

        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{',
                            '"name":"', name,'",',
                            '"description":"',description,'",',
                            '"image": "data:image/svg+xml;base64,', image,'"',
                            '}'
                        )
                    )
                )
            )
        );
    }

    function generateSVGofTokenById(uint256 id) internal pure returns (string memory) {
        string memory svg = string(abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">',
                '<style>.base{font-family:serif;font-size:14px;}.title{font-weight:bold;}</style>',
                '<rect width="100%" height="100%" fill="#9cdbcf" />',
                '<text x="50%" y="40" dominant-baseline="middle" text-anchor="middle" class="base title">Completion Badge</text>',
                '<text x="50%" y="60" dominant-baseline="middle" text-anchor="middle" class="base">#',id.toString(),'</text>',
                '</svg>'
            ));

        return svg;
    }

}
