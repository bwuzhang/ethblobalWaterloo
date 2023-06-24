import React, { useState } from 'react';
import './QuestInvitationRequest.css';

interface QuestInvitationRequestProps {
  onRequestSubmit: (amount: number) => void;
  onRequestClose: () => void;
}

const QuestInvitationRequest: React.FC<QuestInvitationRequestProps> = ({
  onRequestSubmit,
  onRequestClose,
}) => {
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleSubmit = () => {
    onRequestSubmit(amount);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="modal" onClick={handleModalClick}>
        <h2>Request to Join Quest</h2>
        <div className="form-row">
          <label htmlFor="amount">Your Contribution:</label>
          <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
        </div>
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default QuestInvitationRequest;
