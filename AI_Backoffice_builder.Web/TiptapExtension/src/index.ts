import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

// Define the manifest for your custom Tiptap extension
const manifests = [
    {
        type: 'tiptapExtension',
        alias: 'My.Tiptap.InsertSoftHyphen',
        name: 'Soft Hyphen Tiptap Extension',
        loader: () => import('./insert-soft-hyphen.tiptap-api.js'),
        meta: {
            icon: 'icon-code',
            label: 'Insert Soft Hyphen',
            group: '#tiptap_extGroup_formatting',
        },
    },
    {
        type: 'tiptapToolbarExtension',
        kind: 'button',
        alias: 'My.Tiptap.Toolbar.InsertSoftHyphen',
        name: 'Soft Hyphen Toolbar Button',
        loader: () => import('./insert-soft-hyphen.tiptap-toolbar-api.js'),
        meta: {
            icon: 'icon-hyphen',
            label: 'Insert Soft Hyphen',
        },
    },
];

// Register the extension manifests
umbExtensionsRegistry.registerMany(manifests);
