application.factory('mensagemFactory', function () {

	return {

		sucesso: function (p)
		{
			return swal({

				title: p.titulo,
		        text: p.mensagem,
		        type: "success",
		        confirmButtonClass: "btn-success",
		        confirmButtonText: 'Ok!'

			});
		},

		erro: function (p)
		{
			return swal({

				title: p.titulo,
		        text: p.mensagem,
		        type: "error",
		        confirmButtonClass: "btn-danger",
		        confirmButtonText: 'Ok!'

			});
		}
		
	};

});