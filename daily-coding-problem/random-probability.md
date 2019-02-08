This problem was asked by Triplebyte.

You are given n numbers as well as n probabilities that sum up to 1. Write a function to generate one of the numbers with its corresponding probability.

For example, given the numbers [1, 2, 3, 4] and probabilities [0.1, 0.5, 0.2, 0.2], your function should return 1 10% of the time, 2 50% of the time, and 3 and 4 20% of the time.

You can generate random numbers between 0 and 1 uniformly.

```js
    const random = (numbers, probs) => {
        // Find max number of significant digits.
        let [max, sum] = probs.reduce(([max, sum], p) => {
            if (p > 1) throw new Error("Invalid probability");
            const c = p.toString().replace(/^0\./, "").length;
            return [c > max ? c : max, sum + p];
        }, [0, 0]);

        if (sum !== 1) throw new Error(`Probabilities add up to: ${sum}`);

        max = Math.pow(10, max);

        // Create cutoff ranges.
        const range = probs.reduce((range, p) => range.concat([range[range.length - 1] + p * max]), [0]).slice(1);

        // Return generator.
        return () => {
            const r = Math.random() * max;
            return numbers.findIndex((n, i) => r <= range[i]);
        };
    };

    const numbers = [1, 2, 3, 4];
    const probs = [0.1, 0.5, 0.2, 0.2];
    const gen = random(numbers, probs);
    const samples = 1e3;

    // 10 samples
    const dists = Array(samples)
    .fill(!0)
    // Generate.
    .map(gen)
    // To distribution.
    .reduce((dist, i) => (dist[i] += 1) && dist, Array(numbers.length).fill(0))
    // To probabilities.
    .map(d => d / samples);

    console.log(dists);
```