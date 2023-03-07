import styled from "styled-components";
import CloseButton from "../images/CloseButton";
import { theme } from "../style/theme";
export interface ModalHeaderProps {
  companyName: string;
  onClick: () => void;
}
export const ModalHeader = ({ companyName, ...props }: ModalHeaderProps) => {
  return (
    <>
      <_Header>
        {companyName}
        <div {...props}>
          <CloseButton />
        </div>
      </_Header>
    </>
  );
};
const _Header = styled.div`
  background: ${({ theme }) => theme.graduation};
  height: 7rem;
  display: flex;
  padding: 2rem 2rem 0 3rem;
  justify-content: space-between;
  font: 700 1.2rem "Pretendard";
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.white};
  div {
    cursor: pointer;
  }
`;
