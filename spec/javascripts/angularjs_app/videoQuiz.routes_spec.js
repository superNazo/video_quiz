describe("videoQuizRoutes", function() {
  var route;

  beforeEach(function() {
    module('videoQuiz');
    inject(function(_$route_) {
      route = _$route_;
    });
  });

  describe('/:quiz_id/start route', function() {
    it('should be defined', function() {
      var startQuizRoute = route.routes['/:quiz_id/start'];
      expect(startQuizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var startQuizRoute = route.routes['/:quiz_id/start'];
      expect(startQuizRoute.templateUrl).toEqual('angularjs_app/components/quizzes/views/startQuiz.html');
    });

    it('should have right controller', function() {
      var startQuizRoute = route.routes['/:quiz_id/start'];
      expect(startQuizRoute.controller).toEqual('startQuizCtrl');
    });
  });

  describe('/:quiz_id/finish route', function() {
    it('should be defined', function() {
      var finishQuizRoute = route.routes['/:quiz_id/finish'];
      expect(finishQuizRoute).toBeDefined();
    });

    it('should have right template', function() {
      var finishQuizRoute = route.routes['/:quiz_id/finish'];
      expect(finishQuizRoute.templateUrl).toEqual('angularjs_app/components/quizzes/views/finishQuiz.html');
    });
  });

});
