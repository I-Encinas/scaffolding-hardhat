import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function ClearImage({ tokenId, address }: { tokenId: any; address?: string }) {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("MyNFT");
  const [url, setUrl] = useState<string | undefined>("");
  const { data } = useScaffoldReadContract({
    contractName: "MyNFT",
    functionName: "tokenURI",
    args: [tokenId],
  });
  const [cardInfo, setCardInfo] = useState({
    image: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    setUrl(data);
  }, [data]);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(json => setCardInfo(json))
        .catch(error => console.error(error));
    }
  }, [url]);

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl mt-5 flex-auto">
      <figure>
        <img src={cardInfo.image} alt={cardInfo.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cardInfo.name}</h2>
        <p>{cardInfo.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={async () => {
              try {
                await writeYourContractAsync({
                  functionName: "setGreeting",
                  args: [address],
                  value: ethers.parseEther("0.1"),
                });
              } catch (e) {
                console.error("Error setting greeting:", e);
              }
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
