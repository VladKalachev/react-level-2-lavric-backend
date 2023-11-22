import * as Users from '#app/controllers/users.js' 
import * as Todos from '#app/controllers/todos.js' 
import * as Auth from '#app/controllers/auth.js'
import * as Posts from '#app/controllers/posts.js'
import checkAuth from '#app/middleware/auth.js'

export default (app) => {
	app.get('/users', Users.index);
	app.get('/users/:userId', Users.show);
	
	app.get('/users/:userId/todos', Todos.byUser);

	app.post('/auth/login', Auth.login);
	app.get('/auth/check', Auth.check);

	app.get('/users/:userId/posts', Posts.byUser);
	app.get('/posts', Posts.index);
	app.get('/posts/:postId', Posts.show);
	app.post('/posts', checkAuth, Posts.store);
	app.delete('/posts/:postId', checkAuth, Posts.destroy);
	app.put('/posts/:postId', checkAuth, Posts.update);
}