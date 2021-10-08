const { EXECUTION_THRESHOLD } = require('./constants');
const { getInitData, getImportDeclaration } = require('./utils');

function BabelPluginFunctionInjector(babel) {
	const { types: t } = babel;

	let exptNamedExeCount = 0;

	return {
		visitor: {
			Program(path) {
				const { params } = getInitData(this);

				const regex = new RegExp(params.target);
				if (!regex.test(this.file.opts.filename)) return;

				for (const imp of params.imports) {
					let imprtDecl = getImportDeclaration(imp, t);
					path.unshiftContainer('body', imprtDecl);
				}
			},
			ExportNamedDeclaration(path) {
				const { params, func } = getInitData(this);

				if (exptNamedExeCount >= EXECUTION_THRESHOLD) return;
				exptNamedExeCount++;

				const importDeclaration = getImportDeclaration(
					{
						name: 'Component',
						lib: path.node.source.value,
						defaultImport: true,
					},
					t
				);

				const _program = path.findParent((p) => p.isProgram());
				_program.unshiftContainer('body', importDeclaration);

				const arr = [...params.imports];
				arr.shift();

				let callExp = arr.reduce(
					(acc, curr) =>
						t.callExpression(acc, [t.identifier(curr.name)]),
					t.identifier(func.name)
				);

				const componentIdentifier = t.identifier('Component');

				callExp = t.callExpression(callExp, [componentIdentifier]);

				const componentWrapperDeclarator = t.variableDeclarator(
					t.identifier('componentWrapper'),
					callExp
				);

				const componentWrapper = t.variableDeclaration('const', [
					componentWrapperDeclarator,
				]);

				path.node.declaration = componentWrapper;
			},
			ExportDefaultDeclaration(path) {
				const { params, func } = getInitData(this);

				const arr = [...params.imports];
				arr.shift();

				let callExp = arr.reduce(
					(acc, curr) =>
						t.callExpression(acc, [t.identifier(curr.name)]),
					t.identifier(func.name)
				);
				callExp = t.callExpression(callExp, [path.node.declaration]);
				path.node.declaration = callExp;
			},
		},
	};
}

module.exports = BabelPluginFunctionInjector;
