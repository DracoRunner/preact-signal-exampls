import { useComputed, effect, useSignal } from "@preact/signals";
import Counter from "./Counter";

function CounterWithSignals() {
    const countSignal = useSignal(0);
    const incrementSignal = () => (countSignal.value += 1);

    return (
        <Counter
            count={countSignal}
            increment={incrementSignal}
        />
    );
}

export default CounterWithSignals;
