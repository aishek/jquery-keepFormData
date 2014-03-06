(function($) {
  $.keepFormData.defaults = {
    storage_keys_prefix: 'keepFormData',
    form_selector: 'form.keepFormData'
  };
  var defaults = $.keepFormData.defaults;

  $.fn.keepFormData = function() {
    var options = arguments[0],
        settings = $.extend({}, defaults, options),

        target = $(this);

    var keep_form_data_instance = new $.keepFormData.Form(target, settings.storage_keys_prefix);
    target.data('keepFormDataInstance', keep_form_data_instance);

    return target;
  };

  if (defaults.form_selector) {
    $(document).ready(
      function() {
        $(defaults.form_selector).each(function(){
          $(this).keepFormData();
        });
      }
    );
  }
}(jQuery));
