var app = {
    
    initialize: function() {
        this.initFastClick();
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },

    onDeviceReady: function () {

        //chequeo si tienen internet
        if (checkConnection() == 'NoInternet') {
            navigator.notification.alert(
                'Sentimos mas o app só funciona com acesso a internet por enquanto',  // message
                alertDismissed,         // callback
                'Sem Internet',            // title
                'Tchau'                  // buttonName
            );
        }
        saveDevice();
        //Listo las categorias activas en el panel
        GetInfo();
        GetPromo();
        getandsaveGeoLocation();
        GetCategories();
        $(document).on("pagebeforeload", function (event, data) {

            // Let the framework know we're going to handle the load.
            if (data.dataUrl == '/sorteo.html') {
                
            }
            //alert(data.dataUrl);
            //event.preventDefault();
            //resultado = /index.html
            // ... load the document then insert it into the DOM ...
            // at some point, either in this callback, or through
            // some other async means, call resolve, passing in
            // the following args, plus a jQuery collection object
            // containing the DOM element for the page.

            //data.deferred.resolve(data.absUrl, data.options, page);


        });

    }
};