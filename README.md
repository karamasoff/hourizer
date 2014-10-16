jQuery Hourizer
===============

Little jQuery plugin to format an hour field


##Usage

You have a textfield like this in your html page...
```html
<input type="text" name="thetime" class="mytextfield">
```

You want to ensure that it will contain a valid hour:minute value. So something between 00:00 and 23:59.
Actually, it only works for 24 hours, not with the am-pm notation.

Just add this in your javascript
```javascript
$('.mytextfield').hourize();
```

##Events
This plugin raise 2 differents events:

- **hourized** each time the field value changes and the format function have finished to ensure that the value is correct.
- **finishhourized** when you unfocus the target field.
