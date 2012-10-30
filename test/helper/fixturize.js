/* dom helper for working with fixtures in tests
 *
 * usage: 
 *
 * 1. create your handlebar template at test/fixtures/<template>.hbs
 *
 * 2. to write to the current document.body, call it like so:
 *
 *      dom.write('<template>', [{ templateVar : value },] callbackFn);
 *
 * The inclusion of the templateVar object is optional, supporting passing variables into the template via standard Handlebars conventions.
 *
 * 3. if you just want to return the template in memory without writing to the
 * dom, use the create method instead:
 *
 *      dom.create('<template>', function(templateAsDomElements) {
 *          var myElement = $('myElement', templateAsDomElements);
 *      });
 */

define(['hbs!fixtures/layout', '../../components/jquery/jquery'], function(tmplLayout) {
    
    var tmplPath = 'hbs!fixtures/';

    return {
        create: function(tmplName, arg1, arg2) {
            var vals, cb;

            if ( arg1 instanceof Function ) {
                cb = arg1; vals = {};
            } else {
                cb = arg2; vals = arg1;
            }

            require([tmplPath + tmplName], function(tmpl) {
                var div = document.createElement('div');

                div.innerHTML = tmpl(vals);
                cb(div.firstChild);
            });
        },
        write: function(tmplName, arg1, arg2) {
            var vals, cb;

            if ( arg1 instanceof Function ) {
                cb = arg1; vals = {};
            } else {
                cb = arg2; vals = arg1;
            }

            require([tmplPath + tmplName], function(tmpl) {
                var tmplRendered = tmpl(vals);
                $('body').append( tmplLayout({ template: tmplRendered }) );
                if ( cb ) cb();
            });
        },
        remove: function() {
            var wrapper = $('#test-wrapper');

            if ( wrapper ) wrapper.remove();
        }
    };
});

