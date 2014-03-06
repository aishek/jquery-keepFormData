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
