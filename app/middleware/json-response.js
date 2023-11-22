export default app => {
	app.use((_, response, next) => {
		response.setHeader('Content-Type', 'application/json');
		next();
	});
}