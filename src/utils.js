export const getImportDeclaration = (data, t) => {
	const { name, lib, defaultImport } = data;
	const identifier = t.identifier(name);
	const importSpecifier = defaultImport
		? t.importDefaultSpecifier(identifier)
		: t.importSpecifier(identifier, identifier);
	return t.importDeclaration([importSpecifier], t.stringLiteral(lib));
};

export const getInitData = (context) => {
	if (
		!Array.isArray(context.opts.imports) ||
		!context.opts.imports.length > 0 ||
		!context.opts.target
	) {
		console.error(
			'Error: Please provide Function Name, Lib and target correctly in babel config.'
		);
		process.exit(1);
	}
	return { params: context.opts, func: context.opts.imports[0] };
};
