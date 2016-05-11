describe('videoQuizRoutes', function() {
  var route;

  beforeEach(function() {
    module('videoQuiz');
    inject(function(_$route_) {
      route = _$route_;
    });
  });

  it('should load /quizzes when routes is empty', function() {
    expect(route.routes[null].redirectTo).toEqual('/quizzes');
  });

  describe('/quizzes/:quizId/start route', function() {
    it('should be defined', function() {
      var startQuizRoute = route.routes['/quizzes/:quizId/start'];
      expect(startQuizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var startQuizRoute = route.routes['/quizzes/:quizId/start'];
      expect(startQuizRoute.templateUrl)
        .toEqual('angularjs_app/components/quizzes/views/startQuiz.html');
    });

    it('should have right controller', function() {
      var startQuizRoute = route.routes['/quizzes/:quizId/start'];
      expect(startQuizRoute.controller).toEqual('startQuizCtrl');
    });
  });

  describe('/quizzes/:quizId/finish route', function() {
    it('should be defined', function() {
      var finishQuizRoute = route.routes['/quizzes/:quizId/finish'];
      expect(finishQuizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var finishQuizRoute = route.routes['/quizzes/:quizId/finish'];
      expect(finishQuizRoute.templateUrl)
        .toEqual('angularjs_app/components/quizzes/views/finishQuiz.html');
    });
  });

  describe('/quizzes/new route', function() {
    it('should be defined', function() {
      var newQuizRoute = route.routes['/quizzes/new'];
      expect(newQuizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var newQuizRoute = route.routes['/quizzes/new'];
      expect(newQuizRoute.templateUrl)
        .toEqual('angularjs_app/components/quizzes/views/newQuiz.html');
    });

    it('should have right controller', function() {
      var newQuizRoute = route.routes['/quizzes/new'];
      expect(newQuizRoute.controller).toEqual('newQuizCtrl');
    });
  });

  describe('/quizzes/:quizId/edit route', function() {
    it('should be defined', function() {
      var newQuizRoute = route.routes['/quizzes/:quizId/edit'];
      expect(newQuizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var newQuizRoute = route.routes['/quizzes/:quizId/edit'];
      expect(newQuizRoute.templateUrl)
        .toEqual('angularjs_app/components/quizzes/views/editQuiz.html');
    });

    it('should have right controller', function() {
      var newQuizRoute = route.routes['/quizzes/:quizId/edit'];
      expect(newQuizRoute.controller).toEqual('editQuizCtrl');
    });
  });

  describe('/quizzes route', function() {
    it('should be defined', function() {
      var quizzesRoute = route.routes['/quizzes'];
      expect(quizzesRoute).toBeDefined();
    });

    it('should have right template', function() {
      var quizzesRoute = route.routes['/quizzes'];
      expect(quizzesRoute.templateUrl)
        .toEqual('angularjs_app/components/quizzes/views/indexQuiz.html');
    });

    it('should have right controller', function() {
      var quizzesRoute = route.routes['/quizzes'];
      expect(quizzesRoute.controller).toEqual('indexQuizCtrl');
    });
  });
});

describe('videoQuizRoutes', function(){
  var $route, $rootScope, $location, $httpBackend;

  beforeEach(function(){
    module('videoQuiz');

    inject(function($injector){
      $route = $injector.get('$route');
      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend
        .when('GET', 'angularjs_app/components/quizzes/views/indexQuiz.html')
        .respond('/quizzes');

      $httpBackend
        .when('GET', 'angularjs_app/components/quizzes/views/showQuiz.html')
        .respond('/quizzes/:quizId');
    });
  });

  it('should navigate to show quiz template', function(){
    $rootScope.$apply(function() {
      $location.path('/quizzes/:quizId');
    });

    expect($route.current.templateUrl)
    .toBe('angularjs_app/components/quizzes/views/showQuiz.html');
  });

  it('should use showQuizCtrl', function(){
    $rootScope.$apply(function() {
      $location.path('/quizzes/:quizId');
    });

    expect($route.current.controller).toBe('showQuizCtrl');
  });

  it('should use path to show quiz', function(){
    $rootScope.$apply(function() {
      $location.path('/quizzes/:quizId');
    });

    expect($location.path()).toBe('/quizzes/:quizId');
  });

  it('should redirect invalid URLs to all quizzes template', function(){
    $rootScope.$apply(function() {
      $location.path('/other');
    });

    expect($route.current.templateUrl)
    .toBe('angularjs_app/components/quizzes/views/indexQuiz.html');
  });

  it('invalid URLs should use indexQuizCtrl', function(){
    $rootScope.$apply(function() {
      $location.path('/invalid');
    });

    expect($route.current.controller).toBe('indexQuizCtrl');
  });

  it('invalid URLs should use indexQuiz path', function(){
    $rootScope.$apply(function() {
      $location.path('/invalid');
    });

    expect($location.path()).toBe('/quizzes');
  });
});
