import { Component } from "react";
import Game from "./game/Game";
import UI from "./UI/UI";
import { Provider } from "react-redux";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <UI />
        <Game />
      </Provider>
    );
  }
}

export default App;
