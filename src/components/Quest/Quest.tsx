import React, { useState } from 'react';
import QuestInvitationRequest from '../QuestInvitationRequest/QuestInvitationRequest';
import './Quest.css';

export interface QuestProps {
  title: string;
  owner?: string;
  bounty: number;
  deadline: Date;
  currentHelpers: number;
  maxHelpers: number;
  canSendInvitation?: boolean;
}

const Quest: React.FC<QuestProps> = ({
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

  const handleInvitationSubmit = (amount: number) => {
    // Handle the invitation request submit logic
    // e.g., send the invitation request to the server
    console.log('Invitation Request:', amount);
    setShowModal(false);
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
