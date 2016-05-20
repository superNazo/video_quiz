describe('videoQuizRoutes', function() {
  var route;

  beforeEach(function() {
    module('videoQuiz');
    inject(function(_$route_) {
      route = _$route_;
    });
  });

  it('should load /quizzes when route is empty or invalid', function() {
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

  describe('/ login route', function() {
    it('should be defined', function() {
      var loginRoute = route.routes['/'];
      expect(loginRoute).toBeDefined();
    });

    it('should have right template', function() {
      var loginRoute = route.routes['/'];
      expect(loginRoute.templateUrl)
        .toEqual('angularjs_app/components/home/views/index.html');
    });

    it('should have right controller', function() {
      var loginRoute = route.routes['/'];
      expect(loginRoute.controller).toEqual('popUpCtrl');
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
      var editQuizRoute = route.routes['/quizzes/:quizId/edit'];
      expect(editQuizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var editQuizRoute = route.routes['/quizzes/:quizId/edit'];
      expect(editQuizRoute.templateUrl)
        .toEqual('angularjs_app/components/quizzes/views/editQuiz.html');
    });

    it('should have right controller', function() {
      var editQuizRoute = route.routes['/quizzes/:quizId/edit'];
      expect(editQuizRoute.controller).toEqual('editQuizCtrl');
    });
  });

  describe('/quizzes index route', function() {
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

  describe('/quizzes/:quizId show route', function() {
    it('should be defined', function() {
      var showquizRoute = route.routes['/quizzes/:quizId'];
      expect(showquizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var showquizRoute = route.routes['/quizzes/:quizId'];
      expect(showquizRoute.templateUrl)
        .toEqual('angularjs_app/components/quizzes/views/showQuiz.html');
    });

    it('should have right controller', function() {
      var showquizRoute = route.routes['/quizzes/:quizId'];
      expect(showquizRoute.controller).toEqual('showQuizCtrl');
    });
  });
});
