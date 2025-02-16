import { UmbTiptapExtensionApiBase as c } from "@umbraco-cms/backoffice/tiptap";
class r extends c {
  constructor(n) {
    super(n), this.getTiptapExtensions = () => [], this.addCustomButtonsToActionBar();
  }
  // Method to dynamically add buttons to the action bar
  addCustomButtonsToActionBar() {
    const n = setInterval(() => {
      const o = document.querySelector("uui-action-bar");
      if (o) {
        clearInterval(n);
        const t = document.createElement("uui-button");
        t.setAttribute("label", "New Custom Button"), t.setAttribute("look", "secondary"), t.setAttribute("type", "button");
        const i = document.createElement("uui-icon");
        i.setAttribute("name", "icon-plus"), t.appendChild(i), t.addEventListener("click", () => {
          alert("New Custom Button Clicked");
        }), o.appendChild(t);
        const e = document.createElement("uui-button");
        e.setAttribute("label", "Another Button"), e.setAttribute("look", "secondary"), e.setAttribute("type", "button");
        const u = document.createElement("uui-icon");
        u.setAttribute("name", "icon-check"), e.appendChild(u), e.addEventListener("click", () => {
          alert("Another Button Clicked");
        }), o.appendChild(e);
      }
    }, 1e3);
  }
}
export {
  r as default
};
//# sourceMappingURL=insert-soft-hyphen.tiptap-api-CCpKYRc2.js.map
