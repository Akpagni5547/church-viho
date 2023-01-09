;(function ($) {
  $('#typedepense').change(function () {
    var selectedTypeDepense = $(this).val()
    if (selectedTypeDepense === '1') {
      $('#maintenancen').removeClass('d-none')
      $('#maintenancen').show()
    } else {
      $('#maintenancen').hide()
    }
  })
})(jQuery)
