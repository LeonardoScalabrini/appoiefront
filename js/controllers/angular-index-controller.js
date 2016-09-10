appoie.controller('indexController', ['$scope', 'indexFactory', 'cadastroService', 'loginService', function ($scope, indexFactory, cadastroService, loginService) {

  // ALGUMAS CONFIGURAÇÕES DA INDEX

  $scope.cadastroForm = {};
  $scope.enderecoCompleto = {};
  $scope.tipoToast = "";

  var height = window.innerHeight;
  $("#content").css('height', height);

  if ( $('.input-nascimento')[0].type != 'date' ) $('.input-nascimento').datepicker();

  $scope.sexos = [{tipo: "Masculino"}, {tipo: "Feminino"}];

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

    }, function (response) {

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
      indexFactory.notification('alert-success', 'Cadastrado com sucesso');
      $scope.hideCadastro();
    }
  }

  $scope.burcarCep = function (cep)
  {
    cadastroService.buscarCep(cep).then(function (response) {

      $scope.enderecoCompleto = response.data;
      $scope.cadastro.cidade = $scope.enderecoCompleto.cidade;

    }, function (response) {

    })
  }
	
}]);