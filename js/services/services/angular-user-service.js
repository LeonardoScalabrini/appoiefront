appoie.service('userService', function () {

	var user = {};
	
	this.saveUser = function (user)
	{
		user = {
			nome: user.nome, 
			sobrenome: user.sobrenome, 
			email: user.email, 
			cidade: user.cidade, 
			estado: user.estado, 
			primeiroAcesso: user.primeiroAcesso
		};

		return user;
	};

	this.getUser = function ()
	{
		return user;
	};
	
});