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
