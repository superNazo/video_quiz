var videoQuizServices = angular.module("videoQuizServices", ["ngResource"]);

videoQuizServices.factory("Quizzes", ["$resource",
  function($resource){
    return $resource("quizzes.json", {}, {
      query: {method:"GET", isArray:true}
    });
  }
]);
