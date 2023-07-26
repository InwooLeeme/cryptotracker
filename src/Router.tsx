import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/:id"}>
          <Coin />
        </Route>
        <Route path={"/"}>
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
