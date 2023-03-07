import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './style/variables.css';

import useSWR from 'swr'
import { fetcher } from './utils/authFetcher';
import { Login } from './pages/account/Login';
import { SignUp } from './pages/account/SignUp';
setupIonicReact();

const App: React.FC = () => {
  // const { data, error } = useSWR("/user/info", fetcher)
  
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/account/login">
          <Login />
        </Route>
        <Route exact path="/account/signup">
          <SignUp />
        </Route>
        <Route exact path="/company">
          {/* 회사들을 표시 해주는 회사목록페이지 입니다. */}
        </Route>
        <Route exact path="/company/:id">
          {/* 회사의 정보를 자세히 볼 수 있는 페이지 입니다. */}
        </Route>
        <Route exact path="/company/search/:id">
          {/* 회사를 검색 후 검색 결과를 보여주는 페이지 입니다. */}
        </Route>
        <Route exact path="/notice">
          {/* 회사들의 모집공고를 표시해주는 페이지 입니다. */}
        </Route>
        <Route exact path="/notice/search/:id">
          {/* 모집공고를 검색 후 검색 결과를 보여주는 페이지 입니다. */}
        </Route>
        <Route exact path="/notice/:id">
          {/* 모집공고를 자세히 볼 수 있는 페이지 입니다. */}
        </Route>
        <Route exact path="/mypage">
          {/* 내 계정의 정보를 보여주는 페이지 입니다. */}
        </Route>
        <Route exact path="/recruit/:id">
          {/* 취업 현황을 보여주는 페이지 입니다. */}
        </Route>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>
        <Route exact path="*">
          
        </Route>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
