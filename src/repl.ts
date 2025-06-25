export function cleanInput(input: string): string[] {
    return input.trim().split(" ").filter(x => x.length > 0).map(x => x.toLowerCase())
}