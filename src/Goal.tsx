import dayjs from "dayjs";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { Identicon } from "./components/Identicon";
import { ResolvedAttestation } from "./utils/types";
import { timeFormatString } from "./utils/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import CreateAttestation from "./components/CreateAttestation/CreateAttestation";

const Container = styled.div`
  border-radius: 25px;
  border: 1px solid rgba(168, 198, 207, 0.4);
  background: #fff;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const IconHolder = styled.div``;
const NameHolder = styled.div`
  color: #000;
  text-align: center;
  font-size: 14px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  word-break: break-all;
`;
const Time = styled.div`
  color: #adadad;
  text-align: center;
  font-size: 14px;
  font-family: Montserrat;
`;
const Check = styled.div``;

// type Props = {
//   data: ResolvedAttestation[];
//   rootAtt: ResolvedAttestation;
// };

// export function Goal({ data, rootAtt }: Props) {
//   const { address } = useAccount();
//   if (!address) return null;

//   return (
//     <Container
//       onClick={() => {
//         window.open(
//           `https://sepolia.easscan.org/attestation/view/${rootAtt.id}`
//         );
//       }}
//     >
//       <IconHolder>
//         <Identicon address={rootAtt.attester} size={60} />
//       </IconHolder>
//       {/* <NameHolder>{rootAtt.name}</NameHolder> */}
//       <NameHolder>
//         {JSON.parse(rootAtt.decodedDataJson)[0].value.value}
//       </NameHolder>
//       {/* <NameHolder>{rootAtt.refUID}</NameHolder> */}
//       <Time>{dayjs.unix(rootAtt.time).format(timeFormatString)}</Time>
//     </Container>
//   );
// }

type Props = {
  data: ResolvedAttestation[];
  rootAtt: ResolvedAttestation;
  onClick?: () => void;
};

export function Goal({ data, rootAtt }: Props) {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (!address) return null;

  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  // Function to render single attestation
  // Function to render single attestation
  const renderAttestation = (
    attestation: ResolvedAttestation,
    indentLevel: number,
    isChild: boolean
  ) => {
    const indentStyle = { marginLeft: `${indentLevel * 20}px` }; // Indent child elements
    // console.log(JSON.parse(attestation.decodedDataJson));
    return (
      <Container
        style={indentStyle}
        onClick={() => handleOpenModal()}
      >
        <IconHolder>
          <Identicon address={attestation.attester} size={60} />
        </IconHolder>

        {isChild && (
          <NameHolder>
            {JSON.parse(attestation.decodedDataJson)[1].value.value}
          </NameHolder>
        )}
        {!isChild && (
          <NameHolder>
            {JSON.parse(attestation.decodedDataJson)[0].value.value}
          </NameHolder>
        )}
        <Time>{dayjs.unix(attestation.time).format(timeFormatString)}</Time>
        {showModal && (
            <CreateAttestation 
              id={attestation.id}
              onRequestClose={handleCloseModal}
            />
          )}
      </Container>
    );
  };

  // Recursive function to render attestation and its children
  const renderAttestationWithChildren = (
    rootAttestation: ResolvedAttestation,
    level: number
  ) => {
    // Render the root attestation
    const elements = [renderAttestation(rootAttestation, level, level !== 0)];

    // Find child attestations
    const children = data.filter((item) => item.refUID === rootAttestation.id);

    // Render each child attestation (and its children)
    for (const child of children) {
      elements.push(renderAttestationWithChildren(child, level + 1));
    }

    return <>{elements}</>; // Wrap the array of elements in a React fragment
  };

  return <>{renderAttestationWithChildren(rootAtt, 0)}</>;
}
