const { GraphQLError } = require('graphql');

function validateInput(field, fieldName) {
    if (!field) throw new GraphQLError(`No ${fieldName} has been provided`);

    if (field.length < 3) throw new GraphQLError(`${fieldName} must be at least 3 characters long`);
}

module.exports = {
    validateInput,
}