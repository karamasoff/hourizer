/*jslint browser: true, nomen: true*/
/*global define, jQuery */
(function (jQuery) {
    'use strict';

    jQuery.fn.hourize = function () {

        var hoursBackup = '',
            process = function (field, key) {
                // recup de la la valeur du champs
                var hours = jQuery(field).val(),
                    rule1,
                    rule2,
                    rule3,
                    rule4,
                    tab_hour;

                // composé de chiffre uniquement avec éventuellement :
                rule1 = new RegExp("^[0-9]{0,2}[:]{0,1}[0-9]{0,2}$");

                // si notre saisie ne correspond pas à un pattern valide
                // on rétabli la dernière entrée valide
                if (!rule1.test(hours)) {
                    jQuery(field).val(hoursBackup);
                } else {

                    hoursBackup = hours;

                    // composé de chiffre et long de 2
                    rule2 = new RegExp("^[0-9]{2,2}$");

                    // composé de 1 et du double point
                    rule3 = new RegExp("^[0-9][:]$");

                    // composé de chiffres et long de 3
                    rule4 = new RegExp("^[0-9]{3,3}$");

                    // si la touche n'est pas l'effacement (8), on ajoute le : quand 2 char
                    if (rule2.test(hours) && key !== 8) {
                        jQuery(field).val(hours + ':');
                    }

                    // si la touche n'est pas l'effacement (8), on ajoute un 0 devant quand 1 char + :
                    if (rule3.test(hours) && key !== 8) {
                        jQuery(field).val('0' + hours);
                    }

                    // Si y a 3 chiffres, on met un : après les 2 premiers
                    if (rule4.test(hours)) {
                        jQuery(field).val(hours.substr(0, 2) + ':' + hours.substr(2, 1));
                    }

                    // si ça commence par :, on met 00 avant
                    if (hours.substr(0, 1) === ':') {
                        jQuery(field).val('00' + hours);
                    }

                    // si la touche est exit, on complete le champ avec des 0
                    if (key === 'exit') {

                        if (hours.length === 1 && hours.indexOf(':') === -1) { // si long de 1 sans :
                            jQuery(field).val('0' + hours + ':00');
                        } else if (hours.length === 1 && hours.indexOf(':') !== -1) { // si : tout seul
                            jQuery(field).val('');
                        } else if (hours.length === 2 && hours.indexOf(':') === -1) { // si long de 2 sans :
                            jQuery(field).val(hours + ':00');
                        } else if (hours.length === 3 && hours.indexOf(':') === -1) { // si long de 3 sans  :
                            jQuery(field).val(hours.substring(0, 2) + ':' +   hours.substring(2, 3) + '0');
                        } else if (hours.length === 3 && hours.indexOf(':') !== -1) { // si long de 3 avec : // laisse passer l'erreur : 1:100 et :1100, mais bon...
                            jQuery(field).val(hours + '00');
                        } else if (hours.length === 4 && hours.indexOf(':') === -1) { // si long de 4 sans :
                            jQuery(field).val(hours.substring(0, 2) + ':' +   hours.substring(2, 4));
                        } else if (hours.length === 4 && hours.indexOf(':') === 2) { // si long de 4 avec : // laisse passer l'erreur 1:110
                            jQuery(field).val(hours.substr(0, 3) + '0' + hours.substr(3, 1));
                        }



                        // petit test sur la valeur finale de l'heure, histoire de virer les
                        // conneries du genre 35:89...
                        hours = jQuery(field).val();
                        tab_hour = hours.split(':');
                        if (tab_hour[0] > 23) {
                            tab_hour[0] = 23;
                            tab_hour[1] = 59;
                        } else if (tab_hour[1] > 59) {
                            tab_hour[1] = 59;
                        }

                        jQuery(field).val(tab_hour.join(':'));

                        // On reset fieldBackup
                        hoursBackup = '';

                    }
                }

                return jQuery(field).val();
            };

        this.keyup(function (e) {
            var processed = process(this, jQuery(e.keyCode)[0]);
            jQuery(e.currentTarget).trigger('hourized', processed);
        }).focusout(function (e) {
            var processed = process(this, 'exit');
            jQuery(e.currentTarget).trigger('hourized', processed);
        });
        return this;
    };

}(jQuery));