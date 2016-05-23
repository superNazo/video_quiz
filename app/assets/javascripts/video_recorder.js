var ready;
ready = function() {

  $("#reload-page.btn.btn-primary").click(function() {
    window.location.reload();
  });

  return ZiggeoApi.Events.on("submitted", function(data) {
    var massage, videoStatus;
    massage = "The video with token " +
      data.video.token +
      " has been submitted!";
    videoStatus = $("#video-status");
    videoStatus.append(massage);
    videoStatus.show();
  });
};

$(document).ready(ready);
$(document).on("page:load", ready);
