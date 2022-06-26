import { Card, List } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { Address } from "./index";
import { ethers } from "ethers";
import COURSE_BADGES_NFT_ABI from "../contracts/courseBadgesNFTAbi";

export const MyBadges = ({ address, mainnetProvider, userSigner }) => {
  const [balance, setBalance] = useState(0);
  const badgeContractAddress = "0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968";

  const [yourCollectibles, setYourCollectibles] = useState();

  const badgeContract = useMemo(() => {
    return new ethers.Contract(badgeContractAddress, COURSE_BADGES_NFT_ABI, userSigner);
  }, [userSigner, badgeContractAddress]);

  const getBalanceData = async () => {
    const balanceData = await badgeContract.balanceOf(address);
    console.log("balanceData", balanceData.toNumber());
    setBalance(balanceData.toNumber());
  };

  useEffect(() => {
    if (badgeContract && address) {
      getBalanceData();
    }
  }, [badgeContract, address]);

  useEffect(() => {
    const updateYourCollectibles = async () => {
      const collectibleUpdate = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        try {
          console.log("Getteing tokenIndex", tokenIndex, address);
          const tokenId = await badgeContract.tokenOfOwnerByIndex(address, tokenIndex);
          const tokenURI = await badgeContract.tokenURI(tokenId);
          const jsonManifestString = atob(tokenURI.substring(29));
          console.log(jsonManifestString, "jsonManifestString");

          try {
            const jsonManifest = JSON.parse(jsonManifestString);
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setYourCollectibles(collectibleUpdate.reverse());
    };
    updateYourCollectibles();
  }, [address, balance]);

  return (
    <div style={{ width: 820, margin: "auto", paddingBottom: 256 }}>
      <List
        bordered
        dataSource={yourCollectibles}
        renderItem={item => {
          const id = item.id.toNumber();

          return (
            <List.Item key={id + "_" + item.uri + "_" + item.owner}>
              <Card
                title={
                  <div>
                    <span style={{ fontSize: 18, marginRight: 8 }}>{item.name}</span>
                  </div>
                }
              >
                <img src={item.image} alt={"Badge #" + id} />
                <div>{item.description}</div>
              </Card>

              <div>
                owner: <Address address={item.owner} ensProvider={mainnetProvider} blockExplorer="" fontSize={16} />
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default MyBadges;
