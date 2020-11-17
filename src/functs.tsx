export function perf(r: number) {
    return Math.sqrt(r)
}

export function symmetricSpeedup(f: number, n: number, r: number) {
    return (1 / (((1 - f) / perf(r)) + ((f * r) / (n * perf(r)))))
}

export function asymmetricSpeedup(f: number, n: number, r1: number, r2: number = 1) {
    return (1 / (((1 - f) / perf(r1)) + ((f) / (perf(r2) * (n - r1) + perf(r1)))))
}

export function dynamicSpeedup(f: number, n: number, r: number) {
    return (1 / (((1 - f) / perf(r)) + (f / n)))
}
