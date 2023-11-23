import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Helmet } from "react-helmet";
import { GoArrowLeft } from "react-icons/go";

// Components
const Container = styled.div`
  padding: 0 20px;
  max-width: 30rem;
  margin: 0 auto;
  color: white;
`;

const Header = styled.header`
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-align: center;
  a {
    position: absolute;
    left: 0px;
    display: flex;
    padding: 0.8rem;
    box-align: center;
    align-items: center;
    svg {
      width: 40px;
      height: 40px;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const CoinInfo = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.txtColor};
  display: flex;
  justify-content: space-around;
  border-radius: 0.7rem;
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
`;

const CoinItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

const Loader = styled.div``;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.cardColor};
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.txtColor};
`;

// interface

interface IRouteState {
  name: string;
}

interface IParams {
  coinId: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { state } = useLocation<IRouteState>();
  const { coinId } = useParams<IParams>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["prices", coinId],
    () => fetchCoinPrice(coinId)
  );

  //console.log(priceData);

  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={"/"}>
          <GoArrowLeft />
        </Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      <CoinInfo>
        <CoinItem>
          <span>티커</span>
          <span>{priceData?.name}</span>
        </CoinItem>
        <CoinItem>
          <span>순위</span>
          <span>{priceData?.rank}</span>
        </CoinItem>
        <CoinItem>
          <span>현재 값</span>
          <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
        </CoinItem>
      </CoinInfo>
      <CoinInfo>
        <CoinItem>
          <span>현재 공급량</span>
          <span>{priceData?.total_supply}</span>
        </CoinItem>
        <CoinItem>
          <span>최대 공급량</span>
          <span>{priceData?.max_supply}</span>
        </CoinItem>
      </CoinInfo>
      <CoinInfo>
        <span>{infoData?.description}</span>
      </CoinInfo>
      <Tabs>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tab>
      </Tabs>
      <Switch>
        <Route path={`/:coinId/price`}>
          <Price />
        </Route>
        <Route path={`/:coinId/chart`}>
          <Chart coinId={coinId} />
        </Route>
      </Switch>
    </Container>
  );
}

export default Coin;
