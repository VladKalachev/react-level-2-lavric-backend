import User from "#app/models/user.js";

export async function index(_req, resp){
	const data = await User.findAll({
		order: [[ 'id', 'ASC' ]]
	});

	resp.end(JSON.stringify(data));
}

export async function show(req, resp){
	const data = await User.findOne({
		where: { id: req.params.userId }
	});
	
	resp.status(data === null ? 404 : 200).end(JSON.stringify(data));
}