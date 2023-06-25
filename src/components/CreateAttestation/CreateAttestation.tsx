import React, { useState } from 'react';
import { useParams } from 'react-router';
import './CreateAttestation.css';


export interface AttestationProps {
  id: string;
  onRequestClose: () => void;
}

const CreateAttestation: React.FC<AttestationProps> = ({ id, onRequestClose }) => {  
  const [comment, setComment] = useState<string>('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log(id, comment);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="modal" onClick={handleModalClick}>
        <h2>Add Attestation</h2>
        <div className="form-row">
          <label htmlFor="comment">Comment:</label>
          <input type="text" id="comment" value={comment} onChange={handleCommentChange} />
        </div>
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateAttestation;
