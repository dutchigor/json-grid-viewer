const vscode = require('vscode')
const { JsonGridViewer } = require('./json-grid-viewer')

class JsonGridEditorProvider {

	constructor(context) {
		this.context = context
	}

	static register(context) {
		const viewType = 'jsonGridViewer.json'
		const providerRegistration = vscode.window.registerCustomEditorProvider(
			viewType, new JsonGridEditorProvider(context)
		)
		return providerRegistration
	}

	async resolveCustomTextEditor(document, webviewPanel, _token) {
		// Initialise viewer
		const jsonGridViewer = new JsonGridViewer(document, webviewPanel, this.context)

		// Make sure we clean up when our editor is closed.
		webviewPanel.onDidDispose(() => {
			jsonGridViewer.cleanup()
			jsonGridViewer = null
		});
	}
}

module.exports.JsonGridEditorProvider = JsonGridEditorProvider
