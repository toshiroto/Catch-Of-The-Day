import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish"

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  addFish = (fish) => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({ fishes });
  };
  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  addToOrder = (key) => {
    // 1. Take a copy of State
    const order = { ...this.state.order }
    // 2. Add to the order or update the order
    order[key] = order[key] + 1 || 1;
    // 3. call state to update our state object
    this.setState({ order });
  }
  render () {
    console.log('fishes in render', this.state.fishes)
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory  addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App;
