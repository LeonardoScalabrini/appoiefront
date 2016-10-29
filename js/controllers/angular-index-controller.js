appoie.controller('indexController', ['$scope', 'indexFactory', 'cadastroService', 'loginService', function ($scope, indexFactory, cadastroService, loginService) {

  // ALGUMAS CONFIGURAÇÕES DA INDEX

  $scope.cadastroForm = {};
  $scope.enderecoCompleto = {};
  $scope.tipoToast = "";

  var height = window.innerHeight;
  $("#content, #map").css('height', height);

  if ( $('.input-nascimento')[0].type != 'date' ) $('.input-nascimento').datepicker();

// =======================================================================================

  // FUNÇÕES DE EFEITOS E TRANSIÇÕES

  $scope.showCadastro = function (e)
  {
    $("#content").addClass('move-left');
    $("#content-cadastro").addClass('back-position');
    showCadastroEffect();
  }

  $scope.hideCadastro = function (e)
  {
    $("#content").removeClass('move-left');
    $("#content-cadastro").removeClass('back-position');
    limpaCampos();
    showCadastroEffect();
  }

  var showCadastroEffect = function ()
  {
    if($(".layer-background").hasClass('layer-effect')) {
      $(".layer-background").removeClass('layer-effect');
    }
    else {
      $(".layer-background").addClass('layer-effect');
    }
  }

  limpaCampos = function ()
  {
    delete $scope.cadastro;
    $scope.cadastroForm.$setPristine();
  }

// ========================================================================================

  // INTERAÇÕES DO CADASTRO E LOGIN - VERIFICAÇÕES EM ROTAS DO BACK END

  $scope.logar = function (usuario)
  {
    loginService.logar(usuario).then(function (response) {

      window.location.href = "#/home";

    }, function (response) {

      indexFactory.notification('alert-error', 'Login ou senha inválidos');

    })
  }

  $scope.cadastrar = function (usuario)
  {
    if ($scope.cadastroForm.$invalid)
    {
      indexFactory.notification('alert-error', 'Informe os campos corretamente');
    }
    else
    {
      cadastroService.salvar(usuario).then(function (response) {

        indexFactory.notification('alert-success', 'Cadastrado com sucesso');
        $scope.hideCadastro();

      }, function (response) {

        indexFactory.notification('alert-error', 'Informe os campos corretamente');

      });
    }
  }

  $scope.burcarCep = function (cep)
  {
    cadastroService.buscarCep(cep).then(function (response) {

      $scope.enderecoCompleto = response.data;
      $scope.cadastro.cidade = $scope.enderecoCompleto.cidade;
      $scope.cadastro.estado = $scope.enderecoCompleto.estado_info.nome;


    }, function (response) {

    })
  }
	
}]);