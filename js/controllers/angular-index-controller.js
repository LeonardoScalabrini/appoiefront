appoie.controller('indexController', ['$scope', '$localStorage', '$facebook', 'indexFactory', 'cadastroService', 'loginService', '$rootScope', function ($scope, $localStorage, $facebook, indexFactory, cadastroService, loginService, $rootScope) {

  // ALGUMAS CONFIGURAÇÕES DA INDEX

  $scope.cadastroForm = {};
  $scope.tipoToast = "";
  $scope.recuperar = false;
  $scope.cadastro = {};

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

      $localStorage.user = response.data;
      $scope.ROOT = $localStorage.user;

      $scope.ROOT.foto = "/img/team/user-empty.png";

      window.location.href = "#/home";

      console.log($scope.ROOT);
      
    }, function (response) {

      indexFactory.notification('custom-alert alert-position-right alert-error', response.data.message);

    })
  }

  $scope.cadastrar = function (usuario)
  {
    if ($scope.cadastroForm.$invalid)
    {
      indexFactory.notification('custom-alert alert-position-left alert-error', "Preencha os campos corretamente!");
    }
    else
    {
      cadastroService.salvar(usuario).then(function (response) {

        indexFactory.notification('custom-alert alert-position-left alert-success', response.data.message);
        $scope.hideCadastro();

      }, function (response) {

        indexFactory.notification('custom-alert alert-position-left alert-error', response.data.message);

      });
    }
  }

  $scope.burcarCep = function (cep)
  {
    cadastroService.buscarCep(cep).then(function (response) {

      $scope.cadastro.cidade = response.data.cidade;
      $scope.cadastro.estado = response.data.estado_info.nome;

    }, function (response) {

    })
  }

  //FUNÇÕES DO PARA ULTILIZAR A API DO FACEBOOK

  $scope.usuarioFacebook ={};
  $scope.acesso=false;
  $scope.$on('fb.auth.authResponseChange', function() {
      $scope.status = $facebook.isConnected();
      if($scope.status && $scope.acesso ===true ) {
        $facebook.api('me?fields=id,first_name,last_name,birthday,gender,email,location,picture').then(function(user) {

           $scope.user = user;
           $scope.usuarioFacebook.idFacebook =$scope.user.id;
           $scope.usuarioFacebook.nome = $scope.user.first_name;
           $scope.usuarioFacebook.sobrenome = $scope.user.last_name;
           $scope.usuarioFacebook.dataDeNascimento = '27/12/1990'; //$scope.user.birthday;

           if($scope.user.gender === 'male')
              $scope.usuarioFacebook.sexo ='MASCULINO';
           else
              $scope.usuarioFacebook.sexo ='FEMININO';
           
           $scope.usuarioFacebook.email = $scope.user.email;
           $scope.usuarioFacebook.cidade = 'Maringá';//$scope.user.location.name;
           $scope.usuarioFacebook.foto =$scope.user.picture.data.url;

           console.log($scope.usuarioFacebook);

         loginService.salvarUsuarioFacebook($scope.usuarioFacebook).then(function (response) {

              $localStorage.user = response.data;
              $scope.ROOT = $localStorage.user;

              $scope.foto = $scope.ROOT.foto;

              if($scope.acesso === true)
                  window.location.href = "#/home";

          }, function (response) {

          });
         

        });

      }

    });

    $scope.loginFacebook = function() {
         $facebook.login();
         $scope.acesso=true;

    };

    $scope.getFriends = function() {
      if(!$scope.status) return;
      $facebook.cachedApi('/me/friends').then(function(friends) {
        $scope.friends = friends.data;
      });
    }

    $scope.recuperar = function () {
      
      if (!$(".content-login").hasClass('hide'))
      {
        $(".content-login").fadeOut('fast', function() {
          $(this).addClass('hide');
          $(".content-recupera-senha").fadeIn('fast', function() {
            $(this).removeClass('hide');
          });
        });
      }
      else
      {
        $(".content-recupera-senha").fadeOut('fast', function() {
          $(this).addClass('hide');
          $(".content-login").fadeIn('fast', function() {
            $(this).removeClass('hide');
          });
        });
      }

    };

    $scope.recuperarSenha = function (obj) {

      loginService.recuperarSenha(obj).then(function (response) {

        indexFactory.notification('custom-alert alert-position-right alert-success', response.data.message);

        $(".content-recupera-senha").fadeOut('fast', function() {
          $(this).addClass('hide');
          $(".content-login").fadeIn('fast', function() {
            $(this).removeClass('hide');
          });
        });

      }, function (response) {

        indexFactory.notification('custom-alert alert-position-right alert-error', response.data.message);

      })

    }

}]);
