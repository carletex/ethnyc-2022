# ๐ฉโ๐ซ๐จโ๐ซ Staking Course Design App

> This project was created for the ETH NYC Hacakthon organized by ETH Global 

The app will allow users to create courses with built-in crypto incentives!

Here's what a course created with the Staking Course Design app looks like:

1. Students stake funds to get access to the course
2. Students can get a share of their funds back as they complete steps of the course
3. Students are issued NFTs that show they've completed a step of the course.

๐งช A course creator you can use the contracts that are created with these built-in mechanisms! 

# ๐โโ๏ธ Quick Start

1. Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

2. Clone/fork ๐ this repo 

```bash
git clone https://github.com/carletex/ethnyc-2022.git
```

3. Install and start your ๐ทโ Hardhat chain:

```bash
cd ethnyc-2022
yarn install
yarn chain
```

4. In a second terminal window, start your ๐ฑ frontend:

```bash
cd ethnyc-2022
yarn start
```

5. In a third terminal window, ๐ฐ deploy your contract:

```bash
cd ethnyc-2022
yarn deploy
```

6. ๐ฑ Open http://localhost:3000 to see the app

7. Create a new course on the Course Adim Page. 

8. Once the contract(a) are deployed for a new course. Get the address of the staking course and add it to SignUpPage.jsx: The staking contract address (line 14). You will also need to add the address of the NFT Badge contract to MyBadges.jsx: The badges contract address (line 9).

9. Now students can go to the student view, signup and get started! 

---

# ๐ Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)


# ๐ฆ Other Flavors
- [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)
- [scaffold-eth-tailwind](https://github.com/stevenpslade/scaffold-eth-tailwind)
- [scaffold-nextjs](https://github.com/scaffold-eth/scaffold-eth/tree/scaffold-nextjs)
- [scaffold-chakra](https://github.com/scaffold-eth/scaffold-eth/tree/chakra-ui)
- [eth-hooks](https://github.com/scaffold-eth/eth-hooks)
- [eth-components](https://github.com/scaffold-eth/eth-components)
- [scaffold-eth-expo](https://github.com/scaffold-eth/scaffold-eth-expo)
- [scaffold-eth-truffle](https://github.com/trufflesuite/scaffold-eth)

# ๐? Buidl

Check out all the [active branches](https://github.com/scaffold-eth/scaffold-eth/branches/active), [open issues](https://github.com/scaffold-eth/scaffold-eth/issues), and join/fund the ๐ฐ [BuidlGuidl](https://BuidlGuidl.com)!
 - ๐ค  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)
 - ๐  [Create your first NFT](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)
 - ๐ฅฉ  [Build a staking smart contract](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-1-decentralized-staking)
 - ๐ต  [Deploy a token and vendor](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-2-token-vendor)
 - ๐ซ  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/scaffold-eth/scaffold-eth/tree/buyer-mints-nft)
 - ๐ฒ  [Learn about commit/reveal](https://github.com/scaffold-eth/scaffold-eth-examples/tree/commit-reveal-with-frontend)
 - โ๏ธ  [Learn how ecrecover works](https://github.com/scaffold-eth/scaffold-eth-examples/tree/signature-recover)
 - ๐ฉโ๐ฉโ๐งโ๐ง  [Build a multi-sig that uses off-chain signatures](https://github.com/scaffold-eth/scaffold-eth/tree/meta-multi-sig)
 - โณ  [Extend the multi-sig to stream ETH](https://github.com/scaffold-eth/scaffold-eth/tree/streaming-meta-multi-sig)
 - โ๏ธ  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - ๐ฆ  [Ape into learning!](https://github.com/scaffold-eth/scaffold-eth/tree/aave-ape)

# ๐ P.S.

๐ You need an RPC key for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js` with your new key.

๐ฃ Make sure you update the `InfuraID` before you go to production. Huge thanks to [Infura](https://infura.io/) for our special account that fields 7m req/day!

# ๐๐จ Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.

# ๐ฌ Support Chat

Join the telegram [support chat ๐ฌ](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with ๐ scaffold-eth!

---

### Automated with Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/scaffold-eth/scaffold-eth)
