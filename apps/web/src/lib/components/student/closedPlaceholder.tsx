import styled, {keyframes} from "styled-components"

const ClosedNoticePlaceHolder = () => {
    return (
        <NoticeContainer>
            {[0,0].map(() => (
                <div/>
            ))}
        </NoticeContainer>
    )
}

export default ClosedNoticePlaceHolder;

const NoticePlaceHolderBox = keyframes`
    0% {
        right:300%;
    }
    100% {
        right:-200%;
    }
`

const NoticeContainer = styled.div`
    div {
        margin-bottom:6px;
        width: 280px;
        height: 180px;
        background-color:#ebebeb;
        position:relative;
        overflow: hidden;
        &::after {
            position: absolute;
            content: '';
            width: 0px;
            height: 100%;
            top:0;
            box-shadow:0px 0px 100px 100px #d9d9d9;

            animation:${NoticePlaceHolderBox} 2s ease-in-out infinite;
        }
    }
`