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
        GetPromo();
        GetCategories();

    }
};