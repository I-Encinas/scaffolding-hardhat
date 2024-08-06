"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import ClearImage from "~~/components/cards/ClearImage";
import Carousel from "~~/components/carousels/Carousel";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <Carousel />
      <div className="flex justify-center grid-cols-4 gap-4">
        <ClearImage tokenId={0} address={connectedAddress?.toString()} />
        <ClearImage tokenId={1} address={connectedAddress?.toString()} />
        <ClearImage tokenId={2} address={connectedAddress?.toString()} />
      </div>
    </>
  );
};

export default Home;
