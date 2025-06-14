import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import telegramifyMarkdown from 'telegramify-markdown';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telegramify Markdown',
		name: 'telegramifyMarkdown',
		group: ['transform'],
		version: 1,
		description: 'Convert Markdown to Telegram Markdown',
		defaults: {
			name: 'Telegramify Markdown',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Markdown Text',
				name: 'markdownText',
				type: 'string',
				default: '',
				placeholder: 'Enter Markdown text here',
				description: 'The Markdown text to convert to Telegram Markdown format',
			},
			{
				displayName: 'Unsupported Tags Strategy',
				name: 'unsupportedTagsStrategy',
				description: 'What to do with unsupported tags in the Markdown text',
				type: 'options',
				default: 'escape',
				options: [
					{
						name: 'Escape',
						value: 'escape',
						description: 'Escape unsupported tags',
					},
					{
						name: 'Remove',
						value: 'remove',
						description: 'Remove unsupported tags',
					},
					{
						name: 'Keep',
						value: 'keep',
						description: 'Keep unsupported tags as is',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const unsupportedTagsStrategy: UnsupportedTagsStrategy = this.getNodeParameter(
			'unsupportedTagsStrategy',
			0,
			'escape',
		) as UnsupportedTagsStrategy;

		let item: INodeExecutionData;
		let markdownText: string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				markdownText = this.getNodeParameter('markdownText', itemIndex, '') as string;
				item = items[itemIndex];

				item.json.markdownText = telegramifyMarkdown(markdownText, unsupportedTagsStrategy);
			} catch (error) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [items];
	}
}
