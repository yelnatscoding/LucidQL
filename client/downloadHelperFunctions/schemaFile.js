export function schemaFile(schema) {
  const fileContent = `const { makeExecutableSchema } = require('@graphql-tools/schema');
const db = require('./connectToDB');\n\n${schema}`;

  return fileContent;
}

