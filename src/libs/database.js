import api from './api.js';
let token = "";
function _setToken(_token){
	token = _token;
}
function _login(username,password){
    let params= {
    	username: username,
    	password:password
    }
	return api.post('/login', params);
}
function _getUser(username){
    let params= {
		token:token,
    	username: username
    }
	return api.post('/getUser', params);
}

function _select(table,where,order){
	if(table){
		table = table.toUpperCase();
	}
	where = where||[];
	order = order||"";
	let params= {
    	table: table,
    	where:where,
    	order:order
    }
	return api.post('/get', {
		token:token,
		data:JSON.stringify(params)
	});
}
function _selectPage(table,where,order,pageSize,pageNo){
	if(table){
		table = table.toUpperCase();
	}
	where = where||[];
	order = order||"";
	pageSize=pageSize||15;
	pageNo=pageNo||1;
	let params= {
	    	table: table,
	    	where:where,
	    	order:order,
	    	pageSize:pageSize,
	    	pageNo:pageNo
	    }
	return api.post('/page', {
		token:token,
		data:JSON.stringify(params)
	});
}
function _insert(table,model){
	if(table){
		table = table.toUpperCase();
	}
	model = model||{};
	let params= {
	    	table: table,
	    	model:model
	    }
	return api.post('/post', {
		token:token,
		data:JSON.stringify(params)
	});
}
function _update(table,model){
	if(table){
		table = table.toUpperCase();
	}
	model = model||{};
	let params= {
	    	table: table,
	    	model:model
	    }
	return api.post('/put', {
		token:token,
		data:JSON.stringify(params)
	});
}
function _delete(table,model){
	if(table){
		table = table.toUpperCase();
	}
	model = model||{};
	let params= {
	    	table: table,
	    	model:model
	    }
	return api.post('/delete', {
		token:token,
		data:JSON.stringify(params)
	});
}
function _delByIds(table,ids){
	if(table){
		table = table.toUpperCase();
	}
	ids = ids||"";
	let params= {
	    	table: table,
	    	ids:ids
	    }
	return api.post('/delByIds', {
		token:token,
		data:JSON.stringify(params)
	});
}
const database = {};

database.login = _login;
database.getUser = _getUser;
database.select = _select;
database.insert = _insert;
database.update = _update;
database.delete = _delete;
database.delByIds = _delByIds;
database.setToken = _setToken;


export default database;
