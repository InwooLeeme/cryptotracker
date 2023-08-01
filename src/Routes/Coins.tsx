import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "@tanstack/react-query";

// Components
const Container = styled.div`
  padding: 0 20px;
  max-width: 720px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.txtColor};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in-out;
    display: block;
    padding: 10px 0;
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
  const { isLoading, data } = useQuery<ICoinItem[]>(["allCoins"], fetchCoins);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
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
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
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
