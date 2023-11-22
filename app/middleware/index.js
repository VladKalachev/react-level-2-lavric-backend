import bodyParser from '#app/middleware/body-parser.js'
import convertEmptyStringToNull from '#app/middleware/convert-empty-string-to-null.js'
import jsonResponse from '#app/middleware/json-response.js'

export default app => {
	bodyParser(app);
	convertEmptyStringToNull(app);
	jsonResponse(app);
}