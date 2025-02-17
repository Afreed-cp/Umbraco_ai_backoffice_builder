import { umbExtensionsRegistry as e } from "@umbraco-cms/backoffice/extension-registry";
const t = [
  {
    type: "headerApp",
    alias: "Umb.HeaderApp.Chat",
    name: "Chat Header App",
    element: () => import("./chat-header-app.element-p9XfPCTu.js"),
    weight: 500
  }
];
e.registerMany(t);
export {
  t as manifests
};
//# sourceMappingURL=client.js.map
