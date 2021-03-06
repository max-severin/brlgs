/**
 * brlgs.backend.settings.js
 * Module brlgsBackendSettings
 */

/*global $, brlgsBackendSettings */

var brlgsBackendSettings = (function () { "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES ---------------
    var
        onFormSubmit, checkBrands, initModule;
    //----------------- END MODULE SCOPE VARIABLES ----------------

    //------------------- BEGIN EVENT HANDLERS --------------------
    onFormSubmit = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        var f = $(this);
        var st = f.find('select[name="shop_brlgs[status]"] option:selected').val();
            
        $.post(f.attr('action'), f.serialize(), function(response) {
            if (response.status == 'ok') {
                $.plugins.message('success', response.data.message);

                f.find('.submit .button').removeClass('red').addClass('green');
                $("#plugins-settings-form-status").hide()
                $("#plugins-settings-form-status span").html(response.data.message);
                $("#plugins-settings-form-status").fadeIn('slow', function () {
                    $(this).fadeOut(1000);
                });

                if( st === 'on' ) {
                    $('#save-brlgs-form').closest('#brands-wrapper').show();

                    checkBrands();
                } else {
                    $('#save-brlgs-form').closest('#brands-wrapper').hide();
                }
            } else {
                $.plugins.message('error', response.errors || []);

                f.find('.submit .button').removeClass('green').addClass('red');
                $("#plugins-settings-form-status").hide();
                $("#plugins-settings-form-status span").html(response.errors.join(', '));
                $("#plugins-settings-form-status").fadeIn('slow');
            }
        }, 'json');
    };

    checkBrands = function () {

        $('#brands-wrapper').empty().addClass('loading');

        $.get('?plugin=brlgs&action=getbrands', function (response) {
            if (response.status == 'ok' && response.data !== false) {
                $('#brands-wrapper').removeClass('loading').replaceWith( response.data );
            }
        }, 'json');

    };
    //------------------- END EVENT HANDLERS ----------------------

    //------------------- BEGIN PUBLIC METHODS --------------------
    initModule = function () {
        $('#plugins-settings-form').on('submit', onFormSubmit);

        $('.plugin-links a').css({
            'display': 'block',
            'right': '-500px'
        }).animate({
            'right': '0'
        }, 500).animate({
            'right': '-25px'
        }, 100).animate({
            'right': '-35px'
        }, 100).animate({
            'right': '0'
        }, 250);
    };

    return {
        initModule: initModule
    };
    //------------------- END PUBLIC METHODS ----------------------
}());