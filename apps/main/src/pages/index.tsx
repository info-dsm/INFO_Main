import styled from "styled-components";
import React from "react";
import BackgroundImg from "/public/assets/images/background.jpg";
import Image from "next/image";
import StudentImg from "/public/assets/images/student.png";
import CompanyImg from "/public/assets/images/company.png";
import TeacherImg from "/public/assets/images/teacher.png";
import Link from "next/link";

const StudentPage = () => {
  const select = [
    {
      img: StudentImg,
      name: "학생 페이지",
      content: "자신이 지원할 회사나 모집공고를 살펴보세요!",
      link: "https://student.info-dsm.info/",
    },
    {
      img: TeacherImg,
      name: "선생님 페이지",
      content: "회사와 학생을 관리하여 업무부담을 줄여보세요!",
      link: "https://teacher.info-dsm.info/",
    },
    {
      img: CompanyImg,
      name: "기업 페이지",
      content: "회사를 등록해서 모집공고를 올려보세요!",
      link: "https://company.info-dsm.info/",
    },
  ];
  return (
    <>
      <MainDiv>
        <Title>What is INFO</Title>
        <hr />
        <SelectContainer>
          {select.map((e) => (
            <Select>
              <ImageDiv>
                <Image src={e.img} alt="" />
              </ImageDiv>
              <hr />
              <div>{e.name}</div>
              <span>{e.content}</span>
              <Link href={e.link}>
                <button>이동하기</button>
              </Link>
            </Select>
          ))}
        </SelectContainer>
      </MainDiv>
      <Background>
        <Image src={BackgroundImg} alt="" />
      </Background>
    </>
  );
};

export default StudentPage;

const Title = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 30px;
  font-weight: 600;
`;

const ImageDiv = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 38px;
    height: 38px;
    object-fit: contain;
  }
`;

const SelectContainer = styled.div`
  display: inline-flex;
  gap: 70px;
`;

const Select = styled.div`
  width: 230px;
  height: 310px;
  border-radius: 6px;
  background-color: #f5f5f5;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 30px;

  > div {
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.black};
  }

  > span {
    font-size: 16px;
    font-weight: 700;
    color: #929292;
    width: 75%;
    text-align: center;
    word-break: keep-all;
    margin-top: 10px;
    height: 70px;
  }

  button {
    width: 100px;
    height: 35px;
    background-color: ${(props) => props.theme.colors.blue};
    border: none;
    color: ${(props) => props.theme.colors.white};
    font-size: 14px;
    font-weight: 700;
    border-radius: 6px;
    cursor: pointer;
  }

  > hr {
    width: 50px;
    height: 1px;
    border: none;
    background-color: #d3d3d3;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const MainDiv = styled.div`
  padding-top: 12%;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(16, 17, 18, 0.2) 4.95%,
    #101112 95.05%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;

  > hr {
    width: 50px;
    height: 2px;
    border: none;
    background-color: ${(props) => props.theme.colors.white};
    margin: 25px 0 50px;
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
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
