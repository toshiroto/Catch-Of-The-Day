import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'
import PropTypes from 'prop-types'

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    }

    static propTypes = {
        match: PropTypes.object,
    }

    componentDidMount() {
        const { params } = this.props.match
        // first reinstate our localStorage.
        const localStorageRef = localStorage.getItem(params.storeId)
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes',
        })
    }

    componentDidUpdate() {
        console.log(this.state.order)
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        )
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    addFish = (fish) => {
        // 1. take a copy of the existing state
        const fishes = { ...this.state.fishes }
        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish
        // 3. set the new fishes object to state
        this.setState({ fishes })
    }

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of current state
        const fishes = { ...this.state.fishes }
        // 2. Update that state
        fishes[key] = updatedFish
        // 3. set that to state
        this.setState({ fishes })
    }
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
    }

    deleteFish = (key) => {
        // 1- Take a copy of state
        const fishes = { ...this.state.fishes }
        // 2. Update that state
        fishes[key] = null
        // update state
        this.setState({ fishes })
    }
    addToOrder = (key) => {
        // 1. Take a copy of State
        const order = { ...this.state.order }
        // 2. Add to the order or update the order
        order[key] = order[key] + 1 || 1
        // 3. call state to update our state object
        this.setState({ order })
    }
    removeFromOrder = (key) => {
        const order = { ...this.state.order }
        delete order[key]
        // 3. call state to update our state object
        this.setState({ order })
    }
    render() {
        console.log('fishes in render', this.state.fishes)
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline={'Fresh Seafood Market'} />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App
