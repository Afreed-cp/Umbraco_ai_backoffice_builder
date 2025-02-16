
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'headerApp',
		alias: 'Umb.HeaderApp.Chat',
		name: 'Chat Header App',
		element: () => import('./components/chat-header-app.element'),
		weight: 500,
	},
];


umbExtensionsRegistry.registerMany(manifests);