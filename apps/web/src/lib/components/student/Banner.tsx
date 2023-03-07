import styled from "styled-components";
import Image from "next/image";
import MainImage from "../../../../public/assets/images/main.png";
import ArrowText from "./Arrow";

const StudentBanner = () => {
  const noticeSize: number = 1000000;

  return (
    <>
      <Banner>
        <div>
          현재 총 {noticeSize.toString().replace(/(?=(\d{3})+(?!\d))/g, ",")}
          개의 <br /> 모집공고가 있어요
        </div>
        <ArrowText text={"모집공고 둘러보기"} link={"notice"} />
      </Banner>
      <BannerImg>
        <Image src={MainImage} alt="" />
      </BannerImg>
    </>
  );
};

export default StudentBanner;

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
