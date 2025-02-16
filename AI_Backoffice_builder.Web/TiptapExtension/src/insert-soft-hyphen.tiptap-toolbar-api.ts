import { UmbTiptapToolbarElementApiBase } from '@umbraco-cms/backoffice/tiptap';
import type { Editor } from '@umbraco-cms/backoffice/external/tiptap';

export default class UmbTiptapToolbarSoftHyphenExtensionApi extends UmbTiptapToolbarElementApiBase {
    override execute(editor?: Editor) {
        // Inserts the soft hyphen entity
        //editor?.chain().focus().insertContent('\u00AD').run();
        editor?.commands.insertContent('\u00AD');
    }
}
