const vscode = require( 'vscode' )
const hjson = require('hjson')
const path = require( 'path' )
const getNonce  = require( './util' ).getNonce

class JsonGridViewer {
  constructor( document, webviewPanel, context ) {
    this.document = document
    this.webviewPanel = webviewPanel
    this.context = context

    // Setup initial content for the webview
		this.webviewPanel.webview.options = {
			enableScripts: true,
		}

		this.webviewPanel.webview.html = this.getHtmlForWebview()

    // Create document change listener to update the webview
		this.changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === this.document.uri.toString()) {
				this.updateWebview()
			}
		});

    // Create listener to process messages from the webview
		this.webviewPanel.webview.onDidReceiveMessage( msg => {
			switch (msg.type) {
				case 'ready':
					this.updateWebview()
					break;
			}
    })

  }

	getHtmlForWebview() {
		// Local path to script and css for the webview
		const appUri = this.webviewPanel.webview.asWebviewUri( vscode.Uri.file(
			path.join( this.context.extensionPath, 'webview', 'js', 'app.js' )
		))
		const chunkVendorsUri = this.webviewPanel.webview.asWebviewUri( vscode.Uri.file(
			path.join( this.context.extensionPath, 'webview', 'js', 'chunk-vendors.js' )
		))
		const appCssUri = this.webviewPanel.webview.asWebviewUri( vscode.Uri.file(
			path.join( this.context.extensionPath, 'webview', 'css', 'app.css' )
		))

		const nonce = getNonce()

		return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy"
					content="default-src 'none';
					style-src ${this.webviewPanel.webview.cspSource};
					script-src 'nonce-${nonce}';"
				/>
				<title>JSON Grid viewer</title>
				<link href="${appCssUri}" rel="stylesheet">
			</head>
			<body>
				<div id="app"></div>
				<script nonce="${nonce}" src="${chunkVendorsUri}"></script>
				<script nonce="${nonce}" src="${appUri}"></script>
			</body>
		</html>
		`
	}

	// Hook up event handlers so that we can synchronize the webview with the text document.
	updateWebview() {
		let doc
		try {
			doc = hjson.parse( this.document.getText() )
		} catch (error) {
			return
		}
		this.webviewPanel.webview.postMessage({
			type: 'update',
			doc
		})
  }
  
  // remove any listeners
  cleanup() {
    this.changeDocumentSubscription.dispose()
  }
}

exports.JsonGridViewer = JsonGridViewer
