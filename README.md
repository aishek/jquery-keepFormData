[![Code Climate](https://codeclimate.com/github/aishek/jquery-keepFormData.png)](https://codeclimate.com/github/aishek/jquery-keepFormData)

jquery-keepFormData
===================

[Demo](http://aishek.github.io/jquery-keepFormData/) | [v0.0.2 – Latest Release](https://github.com/aishek/jquery-keepFormData/releases/tag/0.0.2)

[README по-русски](https://github.com/aishek/jquery-keepFormData/blob/master/README.ru.md)

This jQuery-plugin allows you to restore the values of the form's fields, the state of checkboxes, radio buttons and select elements that the user entered, after reloading the page. By default, values ​​are stored until form's submit.

jquery-keepFormData keeps values in localStorage. According to [caniuse.com](http://caniuse.com/#search=localStorage) localStorage is supported by Internet Explorer 8.0+, Firefox 26.0+, Chrome 31.0+, Safari 7.0+, Opera 19.0+.

Requires jQuery 1.7.0 or higher (tested with 2.1.0, 2.0.3, 2.0.2, 2.0.1, 2.0.0, 1.10.2, 1.10.1, 1.10.0, 1.9.1, 1.9.0, 1.8.3, 1.8.2, 1.8.1, 1.8.0, 1.7.0).

## HTML requirements

To work correclty, the plugin needs:

* value of the form's `id` attribute, unique for all site's forms;
* value of the control's `name` attribute, which state you want to save, unique for all form's controls.

jquery-keepFormData automatically applied for form elements with `keepFormData` class:

```html
<form id="name_form" class="keepFormData">
  <input name="name">
  <input type="submit">
</form>
```

## API

By default, control's states and values are resetted. You may change this behaviour, by setting form's `data-keep-form-data-clear-on-submit` to any of `0`, `no`, `false`, `off`.

```html
<form id="name_form" class="keepFormData" data-keep-form-data-clear-on-submit="no">
  <input name="name">
  <input type="submit">
</form>
```

For any form there is the `$.keepFormData.Form` class instance – `$('#name_form').data('keepFormDataInstance')`.

You may call it's method to reset all controls states and values: `$.keepFormData.Input` – `$('#name_form input[name=name]').data('keepFormDataInstance')`.

For any control there is the `$.keepFormData.Input` class instance – `$('#name_form input[name=name]').data('keepFormDataInstance')`. This class instance have public methods:

* `$('#name_form input[name=name]').data('keepFormDataInstance').clear_value()` – reset control;
* `$('#name_form input[name=name]').data('keepFormDataInstance').save_value()` – save control's state;
* `$('#name_form input[name=name]').data('keepFormDataInstance').load_value()` – restore control's state.

## Development

1. `npm install grunt-cli -g`
2. `npm install`
3. `https://github.com/gmarty/grunt-closure-compiler`
4. `grunt watch`

## How to contribute

* Fork the project.
* Make your feature addition or bug fix.
* Send me a pull request. Bonus points for topic branches.

## License

jquery-keepFormData is MIT-licensed free software, more in [LICENSE](https://github.com/aishek/jquery-keepFormData/blob/master/LICENSE) file.

## Author

jquery-keepFormData is maintained by [Cifronomika](http://cifronomika.ru/).

Author:

* [Alexandr Borisov](https://github.com/aishek)