ready = ->
  check_to_hide_or_show_add_link = ->
    if $('#questions .question .nested-fields').length == 10
      $('#add_question').hide()
    else
      $('#add_question').show()
    return

  $('#questions').bind 'cocoon:after-insert', ->
    check_to_hide_or_show_add_link()
    return
  $('#questions').bind 'cocoon:after-remove', ->
    check_to_hide_or_show_add_link()
    return
  check_to_hide_or_show_add_link()
  return

$(document).ready ready
$(document).on 'page:load', ready
