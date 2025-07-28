export const generateHeadingsAndHTML = (htmlString) => {
  if (typeof window === "undefined") {
    return { html: htmlString, headings: [] };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const headings = [];
  let idCounter = 0;

  ["h1", "h2", "h3"].forEach((tag) => {
    const elements = doc.querySelectorAll(tag);
    elements.forEach((el) => {
      const text = el.textContent.trim();
      const id = `heading-${idCounter++}`;
      el.setAttribute("id", id);
      headings.push({ id, text, tag });
    });
  });

  return {
    html: doc.body.innerHTML,
    headings,
  };
};
