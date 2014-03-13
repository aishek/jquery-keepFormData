[![Code Climate](https://codeclimate.com/github/aishek/jquery-keepFormData.png)](https://codeclimate.com/github/aishek/jquery-keepFormData)

jquery-keepFormData
===================

[Пример](http://aishek.github.io/jquery-keepFormData/) | [v0.0.2 – последняя версия](https://github.com/aishek/jquery-keepFormData/releases/tag/0.0.2)

[README in english](https://github.com/aishek/jquery-keepFormData)

Этот jQuery-плагин позволяет восстанавливать значения полей, состояния чекбоксов, селектов и радиокнопок формы, которые ввёл пользователь, после перезагрузки страницы. По-умолчанию, значения храняться до отправки формы. 

jquery-keepFormData хранит значения в localStorage. По [данным caniuse.com](http://caniuse.com/#search=localStorage) localStorage работает в Internet Explorer 8.0+, Firefox 26.0+, Chrome 31.0+, Safari 7.0+, Opera 19.0+.

Плагин работает с jQuery 1.7.0 или более новой версией (тестировался на версиях 2.1.0, 2.0.3, 2.0.2, 2.0.1, 2.0.0, 1.10.2, 1.10.1, 1.10.0, 1.9.1, 1.9.0, 1.8.3, 1.8.2, 1.8.1, 1.8.0, 1.7.0).

## Требования к разметке

Для корректной работы плагину нужны:

* значение атрибута `id` формы, уникальное для всех форм сайта;
* значение атрибута `name` контрола, состояние которого нужно сохранять, уникальное для формы контрола.

jquery-keepFormData автоматически применяется для форм с классом `keepFormData`.

```html
<form id="name_form" class="keepFormData">
  <input name="name">
  <input type="submit">
</form>
```

## API

По-умолчанию, после сабмита формы значение полей сбрасываются. Это поведение можно отменить, установив атрибуту `data-keep-form-data-clear-on-submit` формы любое из значений `0`, `no`, `false`, `off`.

```html
<form id="name_form" class="keepFormData" data-keep-form-data-clear-on-submit="no">
  <input name="name">
  <input type="submit">
</form>
```

Для каждой формы доступна переменная экземпляра класса `$.keepFormData.Form` – `$('#name_form').data('keepFormDataInstance')`.

У переменной экземпляра класса формы можно вызвать метод, который принудительно сбросит значения её контролов: `$('#name_form').data('keepFormDataInstance').clear()`.

Для каждого поля внутри формы доступна переменная экземпляра класса-наследника `$.keepFormData.Input` – `$('#name_form input[name=name]').data('keepFormDataInstance')`. У переменной экземпляра класса поля можно вызвать любой из методов:

* `$('#name_form input[name=name]').data('keepFormDataInstance').clear_value()` – сбросить значение поля;
* `$('#name_form input[name=name]').data('keepFormDataInstance').save_value()` – сохранить значение поля;
* `$('#name_form input[name=name]').data('keepFormDataInstance').load_value()` – восстановить значение поля.

## Разработка

1. `npm install grunt-cli -g`
2. `npm install`
3. `https://github.com/gmarty/grunt-closure-compiler`
4. `grunt watch`

## Как делать пулл-реквесты

* Сделайте форк.
* Внесите изменения.
* Сделайте пулл-реквест. Ваши изменения в отдельной ветке принесут плюс в карму :)

## Лицензия

jquery-keepFormData является бесплатным ПО с лицензией MIT, подробности в файле [LICENSE](https://github.com/aishek/jquery-keepFormData/blob/master/LICENSE).

## Автор

Плагин jquery-keepFormData поддерживается [Цифрономикой](http://cifronomika.ru/).

Автор:

* [Александр Борисов](https://github.com/aishek)