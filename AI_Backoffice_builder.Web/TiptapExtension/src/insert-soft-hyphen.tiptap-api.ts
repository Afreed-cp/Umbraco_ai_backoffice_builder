import { UmbTiptapExtensionApiBase } from '@umbraco-cms/backoffice/tiptap';

export default class UmbTiptapSoftHyphenExtensionApi extends UmbTiptapExtensionApiBase {
    // Override the getTiptapExtensions method if you need to provide specific extensions
    getTiptapExtensions = () => [];

    // Method to dynamically add buttons to the action bar
    addCustomButtonsToActionBar() {
        // Use setInterval to wait until the action bar becomes visible
        const interval = setInterval(() => {
            const actionBar = document.querySelector('uui-action-bar'); // Target <uui-action-bar> based on the provided HTML

            if (actionBar) {
                // Ensure that the action bar is available before proceeding
                clearInterval(interval); // Stop the interval once the action bar is found

                // Create and add a new button
                const newButton = document.createElement('uui-button');
                newButton.setAttribute('label', 'New Custom Button');
                newButton.setAttribute('look', 'secondary');
                newButton.setAttribute('type', 'button');
                const icon = document.createElement('uui-icon');
                icon.setAttribute('name', 'icon-plus'); // You can replace with any icon
                newButton.appendChild(icon);

                // Add event listener to the new button
                newButton.addEventListener('click', () => {
                    alert('New Custom Button Clicked');
                });

                // Append the new button to the action bar
                actionBar.appendChild(newButton);

                // You can add more buttons similarly
                const anotherButton = document.createElement('uui-button');
                anotherButton.setAttribute('label', 'Another Button');
                anotherButton.setAttribute('look', 'secondary');
                anotherButton.setAttribute('type', 'button');
                const anotherIcon = document.createElement('uui-icon');
                anotherIcon.setAttribute('name', 'icon-check');
                anotherButton.appendChild(anotherIcon);
                anotherButton.addEventListener('click', () => {
                    alert('Another Button Clicked');
                });
                actionBar.appendChild(anotherButton);
            }
        }, 1000); // Check every 100ms until the action bar is available
    }

    constructor(host:any) {
        // Call the superclass constructor with the host
        super(host);

        // Immediately call the method to add buttons to the action bar after initialization
            this.addCustomButtonsToActionBar();

    }

}
