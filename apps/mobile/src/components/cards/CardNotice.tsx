import { NoticeCardProps, NoticeTags } from "../../utils/interfaces";
import { Body, NoticeContent, Image, NotImage } from "./cards";

export const CardNotice: React.FC<NoticeCardProps> = ({ title, tags, company, image, address }) => {
  return (
    <Body>
      {!image ? 
        <NotImage>
          <Image src="/assets/default.png" />
        </NotImage>
      :
        <Image src={image} />
      }
      <NoticeContent>
        <h1>{title}</h1>
        <div>
          <p><b>기업</b> &nbsp; {company}</p>
          <p><b>주소</b> &nbsp; {address}</p>
        </div>
        <ul>
          {tags.map((tag: NoticeTags, index: number) => (
            <li key={index}>
              {tag.name}
            </li>
          ))}
        </ul>
      </NoticeContent>
    </Body>
  ) 
}
