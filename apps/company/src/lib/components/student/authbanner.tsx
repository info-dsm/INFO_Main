import Image from "next/image";
import styled from "styled-components";
import BannerImage from "../../../../public/assets/images/main.png";
const StudentAuthBanner = () => {
  return (
    <Banner>
      <BannerImg>
        <Image src={BannerImage} alt="" fill object-fit="contain" />
      </BannerImg>
    </Banner>
  );
};

export default StudentAuthBanner;

const Banner = styled.div`
  background: linear-gradient(
    180deg,
    rgba(16, 17, 18, 0.2) 4.95%,
    #101112 95.05%
  );
  width: 100vw;
  height: 100vh;

  div {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    font-size: 48px;
    line-height: 57.28px;
    font-weight: 700;
    position: relative;
  }

  > span {
    top: 59%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BannerImg = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;
