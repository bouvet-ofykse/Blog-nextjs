export class Input {
    private keys = new Set<string>();

    private handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();

        if (
            ["arrowleft", "arrowright", " "].includes(key)
        ) {
            event.preventDefault();
        }

        this.keys.add(key);
    };

    private handleKeyUp = (event: KeyboardEvent) => {
        this.keys.delete(event.key.toLowerCase());
    };

    constructor() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    isPressed(key: string): boolean {
        return this.keys.has(key.toLowerCase());
    }

    destroy() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
        this.keys.clear();
    }
}