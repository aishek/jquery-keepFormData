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
