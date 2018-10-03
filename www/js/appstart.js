function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'NoInternet';

        return states[networkState];

}
function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i)

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }
}
    function alertDismissed() {
        navigator.app.exitApp();
}

    $(function () {
        $("#mapa").click(function () {
            getGeoLocation();
        });
    });

    function GetPromo(){
    $.ajax({
            url: 'https://gpromo.com.br/getpromo.php',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (data) {
                $("#promos").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
            },
            success: function (data) {
                var puthtmlcomp = '';
                var empresa = '';
                var info = '';
                for (var c = 0; c < data.length; c++) {

                    if (empresa != data[c].nomeemp) {
                        if (empresa != '') {
                            info = "</div></div></div>";
                        }
                    }
                    if (empresa != data[c].nomeemp) {
                        info += "<div data-role='collapsible' class='collapse'><h3 id='promohoje'>" + data[c].nomeemp + "</h3><div id='promohojecontent'><div class='phcEmpresaPromo'><table data-role='table' data-mode='reflow' class='ui-responsive'><thead><tr><th data-priority='1'></th><th data-priority='1'></th></tr></thead><tr><td>";
                        info += "<a href='#pa" + c + "' data-rel='popup' data-position-to='window'>";
                        if (data[c].image != '') {
                            info += "<img src='" + data[c].image + "' /></a ></td >";
                        } else {
                            info += "<img src='img/promo.png' /></a ></td >";
                        }
                        //preco normal
                        info += "<td><p class='titlepromo'>" + data[c].producto;
                        if (data[c].preco_n != '') {
                            info += "<span class='precoanterior'> R$ " + data[c].preco_n + "</span>";
                        } else {

                        }
                        //preco promo
                        if (data[c].preco_pro != '') {
                            info += "<span class='precopromo'> agora por <span class='bigred'>R$" + data[c].preco_pro + "</span></span>";
                        } else {

                        }

                        info += "</p>";
                        info += "<div class='ui-block-a data'>Data: " + data[c].datainicio;
                        //horario
                        if (data[c].horario_inciio != '') {
                            info += " -- " + data[c].horario_inciio + " horas</div><div class='ui-block-b divisordata'>|</div><div class='ui-block-c data'>Até: " + data[c].datafin + "</div>";
                        } else {
                            info += "</div > <div class='ui-block-b divisordata'>|</div> <div class='ui-block-c data'>Até: " + data[c].datafin + "</div>";
                        }
                        //notas
                        if (data[c].notas != '') {
                            info += "<p class='coomentpromo'>" + data[c].notas + "</p></td></tr></table><div id='pa" + c + "' data-role='popup' data-overlay-theme='a'><img src='" + data[c].image + "' style='max-width100%'></div>";
                        } else {
                            info += "</td></tr></table><div id='pa" + c + "' data-role='popup' data-overlay-theme='a'><img src='" + data[c].image + "' style='max-width100%'></div>";
                        }

                    } else {
                        var info = "<table data-role='table' data-mode='reflow' class='ui-responsive'><thead><tr><th data-priority='1'></th><th data-priority='1'></th></tr></thead><tr><td>";
                        info += "<a href='#pa" + c + "' data-rel='popup' data-position-to='window'>";
                        if (data[c].image != '') {
                            info += "<img src='" + data[c].image + "' /></a ></td >";
                        } else {
                            info += "<img src='img/promo.png' /></a ></td >";
                        }
                        //preco normal
                        info += "<td><p class='titlepromo'>" + data[c].producto;
                        if (data[c].preco_n != '') {
                            info += "<span class='precoanterior'> R$ " + data[c].preco_n + "</span>";
                        } else {

                        }
                        //preco promo
                        if (data[c].preco_pro != '') {
                            info += "<span class='precopromo'> agora por <span class='bigred'>R$" + data[c].preco_pro + "</span></span>";
                        } else {

                        }

                        info += "</p>";
                        info += "<div class='ui-block-a data'>Data: " + data[c].datainicio;
                        //horario
                        if (data[c].horario_inciio != '') {
                            info += " -- " + data[c].horario_inciio + " horas</div><div class='ui-block-b divisordata'>|</div><div class='ui-block-c data'>Até: " + data[c].datafin + "</div>";
                        } else {
                            info += "</div > <div class='ui-block-b divisordata'>|</div> <div class='ui-block-c data'>Até: " + data[c].datafin + "</div>";
                        }
                        //notas
                        if (data[c].notas != '') {
                            info += "<p class='coomentpromo'>" + data[c].notas + "</p></td></tr></table><div id='pa" + c + "' data-role='popup' data-overlay-theme='a'><img src='" + data[c].image + "' style='max-width100%'></div>";
                        } else {
                            info += "</td></tr></table><div id='pa" + c + "' data-role='popup' data-overlay-theme='a'><img src='" + data[c].image + "' style='max-width100%'></div>";
                        }

                    }

                    empresa = data[c].nomeemp;
                    puthtmlcomp += info;
                }
                $("#promos").html(puthtmlcomp);
                $("#promos").trigger("create");
            }
        });
}

    function GetCategories() {
        $.ajax({
            url: 'https://gpromo.com.br/getcompanys.php?find=categories',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (data) {
                $("#buscadorcar").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
            },
            success: function (data) {

                var puthtmlcomp = "<select name='selectcat' id='selectcat' onchange='OKalert();'><option value='0'>Procurar uma categoria</option>";

                for (var c = 0; c < data.length; c++) {
                    var info = "<option value='"+data[c].id_categoria+"'>" + data[c].categoria+"</option>";
                    puthtmlcomp += info;
                } 
                puthtmlcomp += '</select>';
                $("#buscadorcar").html(puthtmlcomp);
                $("#buscadorcar").trigger("create");
            }
        });
    }


function OKalert(){
    var lat = localStorage.getItem("latitud");
    var long = localStorage.getItem("longitud");
    $.ajax({
            //url: 'https://gpromo.com.br/getcompanys.php?find=companys&cat='+$("#selectcat option:selected").val(),
        url: 'https://gpromo.com.br/getcompanys.php?find=companys&cat=' + $("#selectcat option:selected").val() + '&lat=' + lat + '&long=' + long,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (data) {
                $("#buquedacatresultado").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
            },
            success: function (data) {
                //alert(data);
                var canciones = "";
                for (var c = 0; c < data.length; c++) {
                    var entrega = '';
                    if (data[c].entrega!=0) {
                        entrega = "Sim";
                    } else {
                        entrega = "Não";
                    }
                    var infocancion = "<div class='capEmpresa'>";
                    if (data[c].logo != '') {
                        infocancion += "<div class='sEmpresalogo'><img src='" + data[c].logo + "'></div>";
                    }
                    infocancion += "<div class='sEmpresa'>" + data[c].nomeemp + "</div>";
                    infocancion += "<div class='sInfo'><div class='ui-block-a'><strong>Endereço:</strong>" + data[c].endereco + ", " + data[c].numero + ", " + data[c].bairro + ", " + data[c].cidade + ", " + data[c].estado + "</div><div class='ui-block-a'><strong>Distancia:</strong> " + data[c].distancia + " Km</div><div class='ui-block-a'><strong>Faz entrega: </strong> " + entrega +"</div><div class='ui-block-a' style='word-break: break-word;'><strong>Seguimento:</strong> " + data[c].seguimento +"</div></div>";
                    infocancion += "<div class='sButtom'><a data-theme='b' class='ui-btn ui-shadow ui-corner-all ui-icon-phone ui-btn-icon-notext ui-btn-inline' href='tel:+55" + data[c].telefone + "'>" + data[c].telefone + "</a><br><a class='ui-btn ui-shadow ui-corner-all ui-icon-mail ui-btn-icon-notext ui-btn-inline' href='mailto:" + data[c].email + "'>" + data[c].email + "</a><br><a class='ui-btn ui-shadow ui-corner-all ui-icon-location ui-btn-icon-notext ui-btn-inline' href='#'></a>";
                    if (data[c].what != 0) {
                        infocancion += "<br><a data-theme='b' class='ui-btn ui-shadow ui-corner-all ui-icon-comment ui-btn-icon-notext ui-btn-inline' href='whatsapp://send?text=Olá&phone=+55" + data[c].telefone  + "'>" + data[c].telefone + "</a>";
                    }
                    if (data[c].site != '') {
                        infocancion += "<br><a data-theme='b' class='ui-btn ui-shadow ui-corner-all ui-icon-navigation ui-btn-icon-notext ui-btn-inline' href='" + data[c].site + "'>" + data[c].telefone + "</a>";
                    }
                    infocancion += "</div></div > ";
                    canciones += infocancion;
                }
                canciones += "</ul>";
                $("#buquedacatresultado").html(canciones);
                $("#buquedacatresultado").trigger("create");
            }
    });
}
//ENVIAR EL CORREO

function SendMail(dataForm) {
    var postData = $(dataForm).serialize();

    $.ajax({
        type: 'POST',
        data: postData,
        url: 'https://gpromo.com.br/sendform.php',
        dataType: 'JSON',
        beforeSend: function (data) {
            $("#ResultMail").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
        },
        success: function (data) {
            if (data.mesajefinal != 'Error') {
                $('#ResultMail').html("Sua mensagem foi enviada com sucesso. Entraremos em contato. Obrigado");
            } else {
                $('#ResultMail').html("Ocorreu um erro, por favor, verifique sua conexão e tente novamente");
            }
        },
        error: function () {
            console.log('error' );

        }
    });

    event.preventDefault(); // avoid to execute the actual submit of the form.
};

function saveDevice() {

    var devimei = '1234567890/10';
    var postData = { modelo: device.model, uuid: device.uuid, serial: device.serial, ip: '', subnet: '', imei: devimei };

    $.ajax({
        type: 'POST',
        data: postData,
        url: 'https://gpromo.com.br/savedevice.php',
        dataType: 'JSON',
        success: function (data) {
        },
        error: function () {

        }
    });
};
