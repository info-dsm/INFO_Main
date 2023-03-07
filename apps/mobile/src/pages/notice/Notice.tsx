import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, useIonAlert } from "@ionic/react"
import axios from "axios"
import { useReducer } from "react"
import styled from "styled-components"
import { MouBanner } from "../../components/Banners/MouBanner"
import { CardNotice } from "../../components/cards/CardNotice"
import { Header } from "../../components/Header"
import { SearchBar } from "../../components/SearchBar"
import { noticeReducer } from "../../modules/noticeReducer"
import { Notice } from "../../utils/interfaces"

export const NoticePage: React.FC = () => {
  const [preventAlert] = useIonAlert();
  const [event, updateEvent] = useReducer(noticeReducer, {
    totalPages: 0,
    idx: 0,
    notice: [] as Notice[]
  })

  const getNotices = async () => {
    if (event.idx >= event.totalPages) return false;
    await axios.get(process.env.REACT_APP_BASE_URL + `/notice/list/on?idx=${event.idx}&size=10`)
      .then((response) => {
        updateEvent({ type: "access", notice: response.data.content, total: response.data.totalPages })
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
      <NoticeBody>
        <Header />
        <div className="contentBody">
          <MouBanner />
          <SearchBar url={"/company"} placeholder={"검색어를 입력해주세요. (예. 회사, 직군, 경력 등)"} />
          {event.notice.map((notice: Notice, index: number) => (
            <CardNotice key={index}
              title={notice.detailBusinessDescription}
              company={notice.company.companyName}
              address={notice.company.companyNumber}
              tags={notice.classificationResponse}
            />
          ))}
        </div>
      </NoticeBody>
      {event.idx >= event.totalPages ? 
        <></>
      :
        <IonInfiniteScroll style={{ backgroundColor: "white" }}
          threshold="0"
          onIonInfinite={(ev) => {
            getNotices();
            ev.target.complete()
          }}> 
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      }
    </IonContent>
  )
}

const NoticeBody = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 9999;
`
