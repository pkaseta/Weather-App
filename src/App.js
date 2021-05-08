import { Switch, Route } from 'react-router';
import './App.css';
import Home from "./views/home/Home"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
