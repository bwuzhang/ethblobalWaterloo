import React from 'react';
import QuestInvitation from '../QuestInvitation/QuestInvitation';

export interface QuestInvitationData {
  id: number;
  questId: number;
  questTitle: string;
  joiner: string;
  donationAmount: number;
  onAccept: () => void;
  onReject: () => void;
}

interface QuestInvitationsProps {
  questInvitations: QuestInvitationData[];
}

const QuestInvitations: React.FC<QuestInvitationsProps> = ({ questInvitations }) => {
  return (
    <div className="quests">
      {questInvitations.map((questInvitation) => (
        <QuestInvitation key={questInvitation.id} {...questInvitation} />
      ))}
    </div>
  );
};

export default QuestInvitations;
