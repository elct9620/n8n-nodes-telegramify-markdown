# n8n-nodes-telegramify-markdown

This is an n8n community node. It lets you convert standard Markdown to Telegram Markdown format in your n8n workflows.

Telegramify Markdown helps format your text for Telegram's specific markdown syntax, making your messages display correctly when sent through Telegram's API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

- [Installation](#installation)
- [Operations](#operations)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The Telegramify Markdown node supports the following operations:

- **Convert Markdown to Telegram Markdown** - Transforms standard Markdown into Telegram's supported markdown format

You can configure how to handle unsupported tags with the following options:
- **Escape** - Escapes unsupported Markdown tags (default)
- **Remove** - Removes unsupported tags from the output
- **Keep** - Keeps unsupported tags as they appear in the original text

## Compatibility

This node requires n8n version 20.15 or later.

## Usage

This node is particularly useful when preparing text to be sent via the Telegram node in n8n. Telegram uses a specific subset of Markdown, and this node ensures your formatting will display correctly.

1. Add the Telegramify Markdown node to your workflow
2. Enter your Markdown text or connect it from a previous node
3. Select your preferred strategy for handling unsupported tags
4. Connect the output to a Telegram node or other destination

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [telegramify-markdown package documentation](https://www.npmjs.com/package/telegramify-markdown)
* [Telegram Bot API formatting documentation](https://core.telegram.org/bots/api#formatting-options)

## Version history

- 0.1.3: Current release

