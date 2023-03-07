import styled, {keyframes} from "styled-components"

const CompanyPlaceHolder = () => {
    return (
        <CompanyContainer>
            {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(() => (
                <div/>
            ))}
        </CompanyContainer>
    )
}

export default CompanyPlaceHolder;

const CompanyPlaceHolderBox = keyframes`
    0% {
        right:300%;
    }
    100% {
        right:-200%;
    }
`

const CompanyContainer = styled.div`
width:1448px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: 10%;
  grid-gap:10px;
  margin-right:10px;

    div {
        height: 169px;
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

            animation:${CompanyPlaceHolderBox} 2s ease-in-out infinite;
        }
    }
`