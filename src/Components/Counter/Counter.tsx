import { Signal } from "@preact/signals";


type Props = {
    increment: () => void;
    count: number | Signal<number>;
}

const Counter = ({ count, increment }: Props) => {

    console.log("Counter====>");

    return (
        <div>
            <h2>
                Count:{count}
            </h2>
            <button onClick={increment}>
                Increment
            </button>

        </div>
    );
};

export default Counter;
