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
        watchCurrentPosition();
        GetCategories();
        //window.ga.startTrackerWithId('UA-126146760-1', 30);
        (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'gaU');
        gaU('create', 'UA-126146760-1', { 'storage': 'none', 'clientId': device.uuid });
        gaU('set', 'checkProtocolTask', null);
        gaU('set', 'anonymizeIp', true);
        gaU('set', 'forceSSL', true);
        gaU('send', 'pageview', { 'title': 'I heart Cordova', 'page': '/cordova' });
        gaU('send', 'event', { 'eventCategory': 'My_Category', 'eventAction': 'My_Action', 'eventLabel': 'Event_Label', 'eventValue': 11 });

    }
};