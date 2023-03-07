import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, useIonAlert } from "@ionic/react"
import axios from "axios"
import { useReducer } from "react"
import styled from "styled-components"
import { MouBanner } from "../../components/Banners/MouBanner"
import { CardCompany } from "../../components/cards/CardCompany"
import { Header } from "../../components/Header"
import { SearchBar } from "../../components/SearchBar"
import { companyReducer } from "../../modules/companyReducer"
import { Company } from "../../utils/interfaces"

export const CompanyPage: React.FC = () => {
  const [preventAlert] = useIonAlert();
  const [event, updateEvent] = useReducer(companyReducer, {
    totalPages: 1000,
    idx: 0,
    company: [] as Company[]
  })

  const getCompanys = async () => {
    if (event.idx >= event.totalPages) return false;
    await axios.get(process.env.REACT_APP_BASE_URL + `/company/list/?idx=${event.idx}&size=10`)
      .then((response) => {
        updateEvent({ type: "access", company: response.data.content, total: response.data.totalPages })
      })
      .catch((err) => {
        preventAlert({
          header: "Error!",
          message: "다시 시도 해주세요!" + err,
          buttons: ['OK']
        })
      })
    return true;
  }
  
  return (
    <IonContent>
      <CompanyBody>
        <Header />
        <div className="contentBody">
          <MouBanner />
          <SearchBar url={"/company"} placeholder={"검색어를 입력해주세요. (예. 회사, 직군, 경력 등)"} />
          {event.company.map((company: Company, index: number) => (
            <CardCompany key={index}
              title={company.companyName} 
              desc={company.companyIntroductionResponse.introduction} 
              image={company.companyIntroductionResponse.companyLogo.fileUrl} 
              tags={company.businessTagged} 
            />
          ))}
        </div>
      </CompanyBody>
      {event.idx >= event.totalPages ?
        <></>
      :
        <IonInfiniteScroll style={{ backgroundColor: "white", position: "relative" }}
          threshold="0"
          onIonInfinite={(ev) => {
            getCompanys();
            ev.target.complete()
          }}> 
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>  
      }
    </IonContent>
  )
}

const CompanyBody = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 9999;
`
