import Todo from "#app/models/todo.js";

export async function byUser(req, resp){
	const data = await Todo.findAll({
		where: { userId: req.params.userId }
	});
	
	resp.end(JSON.stringify(data));
}

export async function store(){
	
}