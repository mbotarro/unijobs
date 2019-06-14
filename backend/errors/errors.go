package errors

// General Handlers errors
const (
	QueryParameterError  = "Invalid query parameter value"
	ReadRequestBodyError = "Can't read the request body"
)

// Common JSON errors
const (
	JSONUnmarshalError = "Can't unmashal JSON"
	JSONMarshalError   = "Error while marsheling JSON"
)

// Common DB erros
const (
	DBConnectionError = "Can't connect to the DB"
	DBQueryError      = "Error while querying the DB"
)


// Common ES errors
const(
	ESUnmarshallError = "Can't unmarshall ES response"
)
