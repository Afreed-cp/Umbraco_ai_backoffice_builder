import { umbExtensionsRegistry as t } from "@umbraco-cms/backoffice/extension-registry";
const o = [
  {
    type: "tiptapExtension",
    alias: "My.Tiptap.InsertSoftHyphen",
    name: "Soft Hyphen Tiptap Extension",
    loader: () => import("./insert-soft-hyphen.tiptap-api-CCpKYRc2.js"),
    meta: {
      icon: "icon-code",
      label: "Insert Soft Hyphen",
      group: "#tiptap_extGroup_formatting"
    }
  },
  {
    type: "tiptapToolbarExtension",
    kind: "button",
    alias: "My.Tiptap.Toolbar.InsertSoftHyphen",
    name: "Soft Hyphen Toolbar Button",
    loader: () => import("./insert-soft-hyphen.tiptap-toolbar-api-DwwA4TH_.js"),
    meta: {
      icon: "icon-hyphen",
      label: "Insert Soft Hyphen"
    }
  }
];
t.registerMany(o);
//# sourceMappingURL=client.js.map
