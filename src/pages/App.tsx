import Loader from 'components/Loader'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'

import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Lottery from './Lottery'
import LotteryFactory from './LotteryFactory'
import { RedirectPathToLotteryOnly } from './Lottery/redirects'
import { MEDIA_WIDTHS } from 'theme'
import Footer from 'components/Footer'

const PageWrapper = styled.div`
  max-width: ${MEDIA_WIDTHS.upToLarge}px;
  width: 100%;
  margin: 0 auto;
`

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 110px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      padding: 90px 16px 0px 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 4.8rem 8px 16px 8px;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 4rem 8px 16px 8px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
  max-width: ${MEDIA_WIDTHS.upToLarge}px;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const MarginerSmall = styled.div`
  margin-top: 1rem;
`

export default function App() {
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <Web3ReactManager>
        <PageWrapper>
          <AppWrapper>
            <HeaderWrapper>
              <Header />
            </HeaderWrapper>
            <BodyWrapper>
              <Polling />
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact strict path="/" component={Lottery} />
                  <Route exact strict path="/lotteryfactory" component={LotteryFactory} />
                  <Route component={RedirectPathToLotteryOnly} />
                </Switch>
              </Suspense>
              <MarginerSmall/>
              <Footer />
              <Marginer />
            </BodyWrapper>
          </AppWrapper>
        </PageWrapper>
      </Web3ReactManager>
    </ErrorBoundary>
  )
}
