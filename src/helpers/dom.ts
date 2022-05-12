export function nodeAttribute(node: HTMLElement, name: string, value: any, set = true): void {
    set ? node.setAttribute(name, value) : node.removeAttribute(name);
}
