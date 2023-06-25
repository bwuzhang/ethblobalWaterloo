import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import invariant from 'tiny-invariant';
import { useSigner } from 'wagmi';
import { CUSTOM_SCHEMAS, EASContractAddress } from '../../utils/utils';
import './CreateAttestation.css';

export interface AttestationProps {
  id: string;
  onRequestClose: () => void;
}

const CreateAttestation: React.FC<AttestationProps> = ({ id, onRequestClose }) => {  
  const [comment, setComment] = useState<string>('');
  const { data: signer } = useSigner();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const schemaEncoder = new SchemaEncoder("string goal,string comment,uint8 max_supporters");
      const encoded = schemaEncoder.encodeData([
        { name: "goal", type: "string", value: 'workout twice a week for a month' }, // todo: get the goal title
        { name: "comment", type: "string", value: comment },
        { name: "max_supporters", type: "uint8", value: 2 },
      ]);

      invariant(signer, "signer must be defined");
      const eas = new EAS(EASContractAddress);
      eas.connect(signer);

      const tx = await eas.attest({
        data: {
          recipient: '0xE63d79409783478BcC42ba261576333C2805a802',
          data: encoded,
          refUID: id,
          revocable: true,
          expirationTime: 0,
        },
        schema: CUSTOM_SCHEMAS.MOTIVATE_ME_SCHEMA,
      });

      // todo: page should auto update to show the new attest
      // const uid = await tx.wait();

      // const attestation = await getAttestation(uid);

      // setFinalAttestation(attestation);

      // window.open(
      //   `https://sepolia.easscan.org/attestation/view/${uid}`,
      //   "_blank"
      // );
    } catch (e) {}
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
