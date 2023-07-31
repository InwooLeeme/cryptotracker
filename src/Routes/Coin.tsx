import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

const Loader = styled.div``;

interface IRouteState {
  name: string;
}

interface IParams {
  coinId: string;
}

function Coin() {
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useLocation<IRouteState>();
  const { coinId } = useParams<IParams>();

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
