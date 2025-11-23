export function generateID() {
    let x = Math.random().toString(36).substring(2, 8);
    return x;
}

export function randomHsl() {
    return `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`;
}
