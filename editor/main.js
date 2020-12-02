const { JsonGridEditorProvider } = require( "./json-grid-editor-provider" )

exports.activate = function ( context ) {
	context.subscriptions.push( JsonGridEditorProvider.register( context ) )
}
