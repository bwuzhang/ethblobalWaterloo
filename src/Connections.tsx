import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Goal } from "./Goal";
import GradientBar from "./components/GradientBar";
import { ResolvedAttestation } from "./utils/types";
import {
  EASContractAddress,
  getAttestationsForSchema,
  getENSNames,
} from "./utils/utils";
import React from "react";

const Container = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const AttestationHolder = styled.div``;

const NewConnection = styled.div`
  color: #333342;
  text-align: center;
  font-size: 25px;
  font-family: Montserrat, sans-serif;
  font-style: italic;
  font-weight: 700;
  margin-top: 20px;
`;

const WhiteBox = styled.div`
  box-shadow: 0 4px 33px rgba(168, 198, 207, 0.15);
  background-color: #fff;
  padding: 50px;
  width: 790px;
  border-radius: 10px;
  margin: 40px auto 0;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const eas = new EAS(EASContractAddress);

function Home() {
  const { address } = useAccount();
  const [attestations, setAttestations] = useState<ResolvedAttestation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAtts() {
      setAttestations([]);
      setLoading(true);
      if (!address) return;
      // const tmpAttestations = await getAttestationsForAddress(address);
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
    <Container>
      <GradientBar />
      <NewConnection>Quests</NewConnection>
      <AttestationHolder>
        <WhiteBox>
          {loading && <div>Loading...</div>}
          {attestations
            .filter((att) => att.refUID.includes("0x000000000"))
            .map((attestation) => (
              <Goal data={attestations} rootAtt={attestation} />
            ))}
        </WhiteBox>
      </AttestationHolder>
    </Container>
  );
}

export default Home;
