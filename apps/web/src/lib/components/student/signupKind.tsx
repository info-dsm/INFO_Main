import Image from "next/image";
import Checked from "../../../../public/assets/images/checked";
import failImage from "../../../../public/assets/images/failed.png";
import styled from "styled-components";

const StudentAuthKind = ({
  status,
  content,
}: {
  status?: string;
  content: string;
}) => {
  return (
    <>
      <Kind>
        {status === "checked" ? (
          <Checked />
        ) : (
          <>
            {status === "failed" ? (
              <Image src={failImage} alt="" width={16} height={16} />
            ) : (
              <></>
            )}
          </>
        )}
        {content}
      </Kind>
    </>
  );
};

export default StudentAuthKind;

const Kind = styled.div`
  margin-bottom: 4px;
  gap: 5.5px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(16, 17, 18, 0.4);
  display: inline-flex;
  align-items: center;

  div {
    width: 16px;
    height: 16px;
  }
`;
