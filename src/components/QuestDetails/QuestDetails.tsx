import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { Goal } from '../../Goal';
import { ResolvedAttestation } from '../../utils/types';
import { getAttestationsForSchema } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const AttestationHolder = styled.div``;

const WhiteBox = styled.div`
  box-shadow: 0 4px 33px rgba(168, 198, 207, 0.15);
  background-color: #fff;
  padding: 20px;
  width: 590px;
  border-radius: 10px;
  margin: 40px auto 0;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

function QuestDetails() {
  const [attestations, setAttestations] = useState<ResolvedAttestation[]>([]);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    async function getAtts() {
      setAttestations([]);
      setLoading(true);
      const tmpAttestations = await getAttestationsForSchema();

      const addresses = new Set<string>();

      tmpAttestations.forEach((att: { attester: string; recipient: string; }) => {
        addresses.add(att.attester);
        addresses.add(att.recipient);
      });

      let resolvedAttestations: ResolvedAttestation[] = [];
      console.log('fetching ENS names from connections.tsx', addresses);
      // const ensNames = await getENSNames(Array.from(addresses));
      const ensNames: any[] = [];
      console.log(tmpAttestations);
      if (!address) return;
      tmpAttestations.forEach((att) => {
        if (att.attester.toLowerCase() === address.toLocaleLowerCase()) {
          resolvedAttestations.push({
            ...att,
            name:
              ensNames.find(
                (name: { id: string; }) => name.id.toLowerCase() === att.recipient.toLowerCase()
              )?.name || att.recipient,
          });
        } else {
          resolvedAttestations.push({
            ...att,
            name:
              ensNames.find(
                (name: { id: string; }) => name.id.toLowerCase() === att.attester.toLowerCase()
              )?.name || att.attester,
          });
        }
      });

      setAttestations(resolvedAttestations);
      setLoading(false);
    }
    getAtts();
  }, [address]);

  return (
    <div>
      <h2>Attestations:</h2>
      <AttestationHolder>
        <WhiteBox>
          {attestations
            .filter((att) => att.refUID.includes("0x000000000"))
            .map((attestation) => (
              <Goal data={attestations} rootAtt={attestation} />
            ))}
        </WhiteBox>
      </AttestationHolder>
    </div>
  );
};

export default QuestDetails;
