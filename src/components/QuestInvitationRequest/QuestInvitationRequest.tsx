import React, { useState } from 'react';
import './QuestInvitationRequest.css';

interface InvitationRequestModalProps {
  onRequestSubmit: (amount: number) => void;
  onRequestClose: () => void;
}

const InvitationRequestModal: React.FC<InvitationRequestModalProps> = ({
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

  return (
    <div className="modal">
      <h2>Request to Join Quest</h2>
      <div className="form-row">
        <label htmlFor="amount">Additional Amount:</label>
        <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="buttons">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </div>
  );
};

export default InvitationRequestModal;
