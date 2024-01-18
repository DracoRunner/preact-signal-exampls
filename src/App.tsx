import "./style.css";
import CounterWithSignals from "./Components/Counter/CounterWithSignals";
import CounterWithState from "./Components/Counter/CounterWithState";
import UserWithState from "./Components/Object/UserWithState";
import UserWithSignals from "./Components/Object/UserWithSignal";

function App() {

    return (
        <>
            <div>
                <label>Count with Signal</label>
                <CounterWithSignals />
            </div>
            <div>
                <label>Count with State</label>
                <CounterWithState />
            </div>
            <div>
                <label>User From with Signal</label>
                <UserWithSignals />
            </div>
            <div>
                <label>User From with State</label>
                <UserWithState />
            </div>
        </>
    );
}

export default App;
