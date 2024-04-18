export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className: string | string[] = "",
    content = "",
    id = "",
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);

    if (className) {
        if (typeof className === "string") {
            element.className = className;
        } else {
            element.className = className.join(" ");
        }
    }

    if (id) {
        element.id = id;
    }

    if (content) {
        element.textContent = content;
    }

    return element;
}
