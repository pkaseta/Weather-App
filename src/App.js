import { Switch, Route } from "react-router";
import "./App.css";
import Home from "./views/home/Home";
import Navbar from "./components/navbar/Navbar";
import RadarPage from "./views/RadarPage";
import SevenDay from "./views/sevenDay/SevenDay";
function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/radar" component={RadarPage} />
        <Route exact path="/sevenDay" component={SevenDay} />
      </Switch>
    </div>
  );
}

export default App;
