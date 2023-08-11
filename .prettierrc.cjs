module.exports = {
    parser: 'typescript',
    plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
    printWidth: 120,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    importOrder: ['^node:(.*)$', '<THIRD_PARTY_MODULES>', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ['typescript', 'decorators-legacy', 'importAssertions']
  }
  