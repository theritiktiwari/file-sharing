# Blockchain based File-Sharing System

This is a simple file-sharing system that uses blockchain technology to store files and their metadata. The system is built using the Ethereum blockchain and IPFS. The system allows users to upload files to the IPFS network and store the file's metadata on the Ethereum blockchain. The system also allows users to download files from the IPFS network using the file's metadata stored on the Ethereum blockchain.

The system is built using the following technologies:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Ethereum](https://ethereum.org/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.7/)
- [IPFS](https://ipfs.io/)
- [Web3.js](https://web3js.readthedocs.io/en/v1.5.2/)
- [Metamask](https://metamask.io/)
- [Vercel](https://vercel.com/)

## Developer Setup

First, install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, create a `.env.local` file in the root directory of the project and add the following environment variables:

```env
MONGODB_URI=
MONGODB_DB=
JWT_SECRET=
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
