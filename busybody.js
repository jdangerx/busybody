const undescribe = (desc) => {
  if (desc.childElementCount > 0) {
    if (desc.children[0]) {
      desc.children[0].innerText = "busy";
    }
    if (desc.children[1]) { console.log(desc.children[1].innerText); }
    if (desc.children[2] && desc.children[1].innerText !== ",") {
      desc.children[2].innerText = "";
    }
  }
};

const foo = (mutationsList) => {
  const relevantMutations =
        mutationsList
        .map((mutation) => {
          if (mutation.type === "attributes") {
            return mutation.target;
          } else {
            return Array.from(mutation.addedNodes);
          }
        })
        .flat()
        .filter((node) => node.nodeName !== "#text");


  const mainScreen = relevantMutations.filter(
    (node) => node.matches('[role="main"]')
  );
  const dialog = relevantMutations.filter((node) => node.matches('[role="dialog"]'));

  mainScreen.forEach(
    (node) => {
      const blocks = node.querySelectorAll('[role="button"]');
      blocks.forEach(
        (block) => {
          if (block.childElementCount >= 2) {
            block.children[0].innerText = "";
            const desc = block.children[1];
            undescribe(desc);
          }
        });
    });

  dialog.forEach(
    (node) =>
      {
        const subfields = node.querySelectorAll("[data-text]");
        if (subfields[0]) {
          subfields[0].innerText = "busy";
        }
        return;
      });
  // need to hide participants, description, location
};

const observer = new MutationObserver(foo);

observer.observe(document.querySelector('body'), { childList: true, subtree: true, attributes: true });
