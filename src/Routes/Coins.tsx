import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

// Components
const Container = styled.div`
  padding: 0 20px;
  max-width: 540px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 600;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.txtColor};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 24px;
  display: flex;
  a {
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    padding: 1rem;
    width: 100%;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Loader = styled.div``;

const Image = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// Interface

interface ICoinItem {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoinItem[]>(["allCoins"], fetchCoins, {
    refetchInterval: 10000,
  });
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>Cryptocurrencies</Title>
      </Header>
      <CoinList>
        {isLoading ? (
          <Loader>Loading</Loader>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Image
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                ></Image>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))
        )}
      </CoinList>
    </Container>
  );
}

export default Coins;
