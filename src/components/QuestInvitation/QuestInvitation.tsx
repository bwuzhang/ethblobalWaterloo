import React from 'react';
import './QuestInvitation.css';

interface QuestInvitationProps {
  questTitle: string;
  joinerName: string;
  donationAmount: number;
  onAccept: () => void;
  onReject: () => void;
}

const QuestInvitation: React.FC<QuestInvitationProps> = ({
  questTitle,
  joinerName,
  donationAmount,
  onAccept,
  onReject,
}) => {
  return (
    <div className="quest-invitation">
      <div className="quest-row">
        <div className="quest-column">{questTitle}</div>
        <div className="quest-column">{joinerName}</div>
        <div className="quest-column">{donationAmount} ETH</div>
        <div className="quest-column">
          <button onClick={onAccept}>Accept</button>
        </div>
        <div className="quest-column">
          <button onClick={onReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default QuestInvitation;
