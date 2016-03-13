ready = ->
  $('#reload-page.btn.btn-primary').click ->
    window.location.reload()
    return

  ZiggeoApi.Events.on 'submitted', (data) ->
    massage = 'The video with token ' +
      data.video.token +
      ' has been submitted!'
    videoStatus = $('#video-status')
    videoStatus.append(massage)
    videoStatus.show()
    return

$(document).ready ready
$(document).on 'page:load', ready
