import React from 'react';
import QuestInvitation from '../QuestInvitation/QuestInvitation';

interface QuestInvitationData {
  id: number;
  owner: string;
  title: string;
  bounty: number;
  deadline: Date;
  currentHelpers: number;
  maxHelpers: number;
  
}

interface QuestInvitationsProps {
  quests: QuestInvitationData[];
}

const MyQuestInvitations: React.FC<QuestInvitationsProps> = ({ quests }) => {
  return (
    <div className="quests">
      {/* {quests.map((quest) => (
        <QuestInvitation key={quest.id} {...quest} />
      ))} */}
    </div>
  );
};

export default MyQuestInvitations;
