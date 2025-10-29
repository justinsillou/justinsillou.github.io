import { visit } from "unist-util-visit";

export default function rehypeFootnotesRemoveTitle() {
    return (tree) => {
        visit(tree, (node, index, parent) => {
            // Cherche une section de footnotes
            if (
                node.tagName === "section" &&
                node.properties?.className?.includes("footnotes")
            ) {
                // Supprime le premier <h2> ou <h3> enfant s'il existe
                node.children = node.children.filter(
                    (child) => !(child.tagName === "h2" || child.tagName === "h3")
                );

                // Optionnel : si tu veux forcer un <hr> en haut de section
                const hasHr = node.children.some((child) => child.tagName === "hr");
                if (!hasHr) {
                    node.children.unshift({
                        type: "element",
                        tagName: "hr",
                        properties: {},
                        children: [],
                    });
                }
            }
        });
    };
}
