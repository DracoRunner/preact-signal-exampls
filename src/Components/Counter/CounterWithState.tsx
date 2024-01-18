import { useEffect, useState } from "react";
import Counter from "./Counter";

function CounterWithState() {
    const [countState, setCountState] = useState(0);
    const incrementState = () =>
        setCountState((oldCountState) => oldCountState + 1);
    return (
        <Counter
            count={countState}
            increment={incrementState}
        />
    );
}

export default CounterWithState;
