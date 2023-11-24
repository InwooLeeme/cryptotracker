import { useQuery } from "@tanstack/react-query";
import { fetchCoinPrice } from "../api";
import styled from "styled-components";

interface IPrice {
  coinId: string;
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

const Container = styled.div``;

const RealTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 1rem;
  margin: 1rem 0;
  gap: 2rem;
`;

const RealTimeItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.txtColor};
  border-radius: 0.7rem;
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
`;

const Price = ({ coinId }: IPrice) => {
  const { isLoading, data: priceData } = useQuery<IPriceData>(
    ["prices", coinId],
    () => fetchCoinPrice(coinId)
  );

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <Container>
          <RealTimeContainer>
            <RealTimeItem>
              <div>1시간 전보다</div>
              <div>{priceData?.quotes.USD.percent_change_1h}%</div>
            </RealTimeItem>
            <RealTimeItem>
              <div>6시간 전보다</div>
              <div>{priceData?.quotes.USD.percent_change_6h}%</div>
            </RealTimeItem>
            <RealTimeItem>
              <div>12시간 전보다</div>
              <div>{priceData?.quotes.USD.percent_change_12h}%</div>
            </RealTimeItem>
            <RealTimeItem>
              <div>하루 전보다</div>
              <div>{priceData?.quotes.USD.percent_change_24h}%</div>
            </RealTimeItem>
          </RealTimeContainer>
        </Container>
      )}
    </>
  );
};

export default Price;
