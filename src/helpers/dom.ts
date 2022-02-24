export function nodeAttribute(node: HTMLElement, name: string, value: any, set: boolean = true): void {
    set ? node.setAttribute(name, value) : node.removeAttribute(name)
}
