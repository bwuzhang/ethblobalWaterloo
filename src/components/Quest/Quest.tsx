import React, { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import QuestInvitationRequest from "../QuestInvitationRequest/QuestInvitationRequest";
import "./Quest.css";
import { ethers } from "ethers";

export interface QuestProps {
  id: number;
  title: string;
  owner?: string;
  bounty: number;
  deadline: Date;
  currentHelpers: number;
  maxHelpers: number;
  canSendInvitation?: boolean;
}

const Quest: React.FC<QuestProps> = ({
  id,
  title,
  owner,
  bounty,
  deadline,
  currentHelpers,
  maxHelpers,
  canSendInvitation = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const goalContractAddress = "0xE4D16D89c1D8C92Af698F370c74982b381BD0FAE";
  const { config } = usePrepareContractWrite({
    address: goalContractAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_goalId",
            type: "uint256",
          },
        ],
        name: "addSupporter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "addSupporter",
    args: [ethers.BigNumber.from(id)],
    
  });

  // const { write } = useContractWrite(config);
  const handleInvitationSubmit = (amount: number) => {
    // Handle the invitation request submit logic
    // e.g., send the invitation request to the server
    console.log("Invitation Request:", amount);
    console.log(id);
    // write?.();
    // console.log(write);
    // setShowModal(false);
  };

  return (
    <div className="quest">
      <div className="quest-row">
        <div className="quest-column">
          <h3>{title}</h3>
          {owner && <p className="owner">{owner}</p>}
        </div>
        <div className="quest-column">
          <p>{deadline.toDateString()}</p>
        </div>
        <div className="quest-column">
          <p>{bounty} ETH</p>
          <p>
            {currentHelpers} / {maxHelpers}
          </p>
          {canSendInvitation && (
            <button onClick={handleOpenModal}>Send Invitation</button>
          )}
          {showModal && (
            <QuestInvitationRequest
              onRequestSubmit={handleInvitationSubmit}
              onRequestClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Quest;
