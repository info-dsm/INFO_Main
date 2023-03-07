import { BannersBackground } from "./banner"

export const MouBanner: React.FC = () => {
  return (
    <BannersBackground type={true}>
      <div>
        <h1>이번 년도에는 총 100개의 회사와 MOU를 맺었어요</h1>
        <p>DSM의 회사 목록을 확인해보세요!  - 2022.12.30 기준</p>
      </div>
      <img alt='MouBanner' src="/assets/banners/MouBanner.png" />
    </BannersBackground>
  )
}
