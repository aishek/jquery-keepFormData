/** @preserve jQuery keepFormData plugin v0.0.1
 * (c) 2014, Alexandr Borisov.
 * https://github.com/aishek/jquery-keepFormData
 */

$.keepFormData = {};

(function(){
  var __hasProp = {}.hasOwnProperty;

  var __extends = function(child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;

    child.prototype = new ctor();
    child.__super__ = parent.prototype;

    return child;
  };

  $.keepFormData.Util = {
    extends: __extends
  };
})();

(function(){
  function Input(form, node, save_events) {
    this.form = form;
    this.node = node;
    this.save_events = save_events || 'change paste keyup blur';

    this.attach_save_value_handler();
    this.load_value();

    this.node.data('keepFormDataInstance', this);
  };

  Input.prototype.get_key = function(input) {
    if (!this.key) {
      this.key = this.form.key(this.node.attr('name'));
    }

    return this.key;
  };

  /**
  * HINT: Using square brackets notation to aviod minification by closure compiler
  */
  Input.prototype['clear_value'] = function() {
    localStorage.removeItem(this.get_key());
  };

  /**
  * HINT: Using square brackets notation to aviod minification by closure compiler
  */
  Input.prototype['save_value'] = function() {
    localStorage.setItem(this.get_key(), this.get_value());
  };

  /**
  * HINT: Using square brackets notation to aviod minification by closure compiler
  */
  Input.prototype['load_value'] = function() {
    var value = localStorage.getItem(this.get_key())
    this.set_value(value);
  };

  /** @private */
  Input.prototype.get_value = function() {
    return this.node.val();
  };

  /** @private **/
  Input.prototype.set_value = function(value) {
    if (value === undefined || value === null) {
      this.node.val(this.node.attr('value') || this.node.text());
    }
    else {
      this.node.val(value);
    }
  };

  /** @private */
  Input.prototype.attach_save_value_handler = function() {
    var self = this;
    this.node.on(
      this.save_events,
      function() {
        self.save_value();
      }
    );
  };


  $.keepFormData.Input = Input;
})();

(function(){
  function Select(form, node) {
    Select.__super__.constructor.call(this, form, node, 'change keyup blur');
  };

  $.keepFormData.Util.extends(Select, $.keepFormData.Input);

  /** @private **/
  Select.prototype.set_value = function(value) {
    if (value === undefined || value === null) {
      var value_node = $('option[selected]', this.node),
          value = value_node.attr('value') || value_node.text();

      this.node.val(value);
    }
    else {
      this.node.val(value);
    }
  };


  $.keepFormData.Select = Select;
})();

(function(){
  function CheckBox(form, node) {
    CheckBox.__super__.constructor.call(this, form, node, 'change keyup blur');
  };

  $.keepFormData.Util.extends(CheckBox, $.keepFormData.Input);


  /** @private */
  CheckBox.prototype.get_value = function() {
    return (this.node.is(':checked') ? '1' : '0');
  };

  /** @private **/
  CheckBox.prototype.set_value = function(value) {
    switch (value) {
      case '1':
        this.node.prop('checked', true);
        break;

      case '0':
        this.node.prop('checked', false);
        break;

      default:
        this.node.prop('checked', this.node.is('[checked]'));
    }
  };

  $.keepFormData.CheckBox = CheckBox;
})();

(function(){
  var undefined;

  function Radio(form, node) {
    Radio.__super__.constructor.call(this, form, node, 'change keyup blur');
  };

  $.keepFormData.Util.extends(Radio, $.keepFormData.Input);


  /** @private */
  Radio.prototype.get_value = function() {
    return (this.node.is(':checked') ? this.node.val() : undefined);
  };

  /** @private **/
  Radio.prototype.set_value = function(value) {
    this.node.prop('checked', (value === this.node.val()));
  };

  $.keepFormData.Radio = Radio;
})();

(function(){
  function Form(node, prefix) {
    this.node = node;
    this.prefix = prefix;

    this.name = this.guess_name(this.node);

    this.inputs = this.create_inputs(this.node);

    if ( this.should_attach_clear_handler() ) {
      this.attach_clear_handler();
    }
  };

  Form.prototype.key = function(name) {
    return this.prefix + '[' + this.name + '][' + name + ']';
  };

  /** @private */
  Form.prototype.should_attach_clear_handler = function() {
    var clear_on_submit = this.node.data('keep-form-data-clear-on-submit').toString().toLowerCase();

    return this.inputs.length > 0 &&
      (
        clear_on_submit === '1' ||
        clear_on_submit === 'yes' ||
        clear_on_submit === 'on' ||
        clear_on_submit === 'true'
      );
  };

  /** @private */
  Form.prototype.guess_name = function(node) {
    var id;
    if ((id = node.attr('id')) && id.length > 0) {
      return id;
    }
    else {
      this.warn("Cannot use jQuery keepFormData – need id attr for <form>");
    }
  };

  /** @private */
  Form.prototype.warn = function(message) {
    if (console && console.warn) {
      console.warn(message);
    }
  };

  /** @private */
  Form.prototype.attach_clear_handler = function() {
    var self = this;
    this.node.on(
      'submit',
      function() {
        self.clear_saved_values();
      }
    );
  };

  Form.prototype.clear = function() {
    this.clear_saved_values();
    var inputs = this.inputs;

    for(var i = 0, l = inputs.length; i < l; i++) {
      inputs[i].load_value();
    }
  };

  /**
  * HINT: Using square brackets notation to aviod minification by closure compiler
  */
  Form.prototype['clear_saved_values'] = function() {
    var inputs = this.inputs;

    for(var i = 0, l = inputs.length; i < l; i++) {
      inputs[i].clear_value();
    }
  };

  /** @private */
  Form.prototype.create_inputs = function(node) {
    var form = this;

    return $('input, textarea, select', node).map(function(){
      return form.input_factory($(this));
    });
  };

  /** @private */
  Form.prototype.input_factory = function(node) {
    var input;
    if (this.available_to_keep(node)) {
      switch ( node.attr('type') ) {
        case 'checkbox':
          input = new $.keepFormData.CheckBox(this, node);
          break;

        case 'radio':
          input = new $.keepFormData.Radio(this, node);
          break;

        default:
          if (node.is('select')) {
            input = new $.keepFormData.Select(this, node);
          }
          else {
            input = new $.keepFormData.Input(this, node);
          }
      }
    }

    return input;
  };

  /** @private */
  Form.prototype.available_to_keep = function(node) {
    var name = node.attr('name');
    return (name !== undefined && name.length > 0);
  };


  $.keepFormData.Form = Form;
})();

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
