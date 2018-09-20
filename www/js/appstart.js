﻿    function checkConnection() {
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

        //alert('Connection type: ' + states[networkState]);
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
            success: function (data) {
                alert(data);  
                var puthtmlcomp='';
                for (var c = 0; c < data.length; c++) {
                    var info = "<div data-role='collapsible' class='collapse'><h3 id='promohoje'>"+data[c].nomeemp+"</h3><div id='promohojecontent'><div class='phcEmpresaPromo'><table data-role='table' data-mode='reflow' class='ui-responsive'><thead><tr><th data-priority='1'></th><th data-priority='1'></th></tr></thead><tr><td>";
                    info += "<a href='#pa"+c+"' data-rel='popup' data-position-to='window'><img src='"+data[c].image+"' /></a></td><td><p class='titlepromo'>"+data[c].producto+"</p><div class='ui-block-a data'>Data: "+data[c].datainicio+" "+data[c].horario_inciio+" horas</div><div class='ui-block-b divisordata'>|</div><div class='ui-block-c data'>Até: "+data[c].datafin+"</div>";
                    info += "<p class='coomentpromo'>"+data[c].notas+"</p></td></tr></table><div id='pa"+c+"' data-role='popup' data-overlay-theme='a'><img src='"+data[c].image+"' style='max-width100%'></div></div></div></div>";
                    puthtmlcomp += info;
                }
                $("#promos").html(puthtmlcomp);
                //$("#buscadorcar").trigger("updatelayout");
                $("#promos").trigger("create");
            }
        });
}

    function GetCategories() {
        $.ajax({
            //SELECT DISTINCT wp_categorias.categoria FROM wp_categorias, wp_comercios WHERE wp_comercios.`id_cat` = wp_categorias.`id_categoria`
            url: 'https://gpromo.com.br/getcompanys.php?find=categories',
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                //alert(data);  



                var puthtmlcomp = "<select name='selectcat' id='selectcat' onchange='OKalert();'><option value='0'>Procurar uma categoria</option>";
//                var puthtmlcomp = "<div data-role='collapsible-set' data-theme='c' data-content-theme='d' class='ui-collapsible-set ui-group-theme-c ui-corner-all'>";
                for (var c = 0; c < data.length; c++) {
                    var info = "<option value='"+data[c].id_categoria+"'>" + data[c].categoria+"</option>";
                    //var info = "<div data-role='collapsible' class='collapse'><h3 id='titlecat'  data-cat='" + data[c].id_categoria+"'>" + data[c].categoria + "</h3><div id='c" + data[c].categoria+"'></div >asdasdasdasd</div>";
                    //var info = "<div data-role='collapsible' class='ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content ui-first-child ui-last-child ui-collapsible-collapsed'><h3 class='ui-collapsible-heading ui-collapsible-heading-collapsed'><a href='javascript:Getlistcom(" + data[c].id_categoria + ");' class='ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-c ui-icon-plus'>" + data[c].categoria + "<span class='ui-collapsible-heading-status'> click to expand contents</span></a>";

                    //info += "</h3><div class='ui-collapsible-content ui-body-inherit ui-collapsible-content-collapsed' aria-hidden='true'><p>I'm the collapsible content for section 1</p></div></div>";

                    puthtmlcomp += info;
                }
                //puthtmlcomp += "</div>";  
                puthtmlcomp += '</select>';
                $("#buscadorcar").html(puthtmlcomp);
                //$("#buscadorcar").trigger("updatelayout");
                $("#buscadorcar").trigger("create");
            }
        });
    }


function OKalert(){
        $.ajax({
            url: 'https://gpromo.com.br/getcompanys.php?find=companys&cat='+$("#selectcat option:selected").val(),
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (data) {
                $("#buquedacatresultado").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
            },
            success: function (data) {
                //alert(data);
                var canciones = "";
                for (var c = 0; c < data.length; c++) {
                    var infocancion = "<div class='sEmpresa'>" + data[c].nomeemp + "</div><div class='sInfo'><div class='ui-block-a'>"+data[c].endereco+", "+data[c].numero+", "+data[c].bairro+", "+data[c].cidade+", "+data[c].estado+"</div><div class='ui-block-a'><a class='ui-btn ui-shadow ui-corner-all ui-icon-phone' href='tel:+55" + data[c].telefone + "'>" + data[c].telefone + "</a></div><div class='ui-block-b'><a class='ui-btn ui-shadow ui-corner-all ui-icon-phone' href='mailto:"+data[c].email+"'>"+data[c].email+"</a></div></div>";
                    canciones += infocancion;
                    console.log(infocancion);
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
            console.log(data);
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