/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // But you can create a sidebar manually

    tutorialSidebar: [
        'intro',
        'showcase',
        'tutorial',
        {
            type: 'category',
            label: 'API reference',
            collapsible: true,
            collapsed: false,
            link: {
                type: 'generated-index',
                title: 'API reference',
                description: "Component's props and function's signatures",
            },
            items: [
                'api-reference/local-toast-provided', 
                'api-reference/local-toast-target', 
                'api-reference/use-local-toast',
                'api-reference/custom-toast-component',
                'api-reference/use-custom-local-toast',
                
            ],
        }
    ],

};

module.exports = sidebars;
