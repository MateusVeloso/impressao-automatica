//var electron = require('electron');
//const ipc = electron.ipcRenderer;
//console.log(ipc);

function getParameter(p) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var parameter = url.searchParams.get(p);
    return parameter;
}

function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear(),
        hora = (data.getHours().toString().length == 1) ? '0' + data.getHours() : data.getHours(), // 0-23
        min = (data.getMinutes().toString().length == 1) ? '0' + data.getMinutes() : data.getMinutes(), // 0-59
        seg = data.getSeconds(), // 0-59
        mseg = data.getMilliseconds(); // 0-999

    return diaF + "/" + mesF + "/" + anoF + " " + hora + ':' + min;
}

jQuery('[data-dthr-emissao]').text(dataAtualFormatada());


function removerVirgula(v) {
    return parseFloat(v.replace(',', '.'));
}

function colocarVirgula(v) {
    return String(parseFloat(v).toFixed(2)).replace('.', ',');
}

// http://localhost:3000/imprimir?produtos=1-BAURU%20(Lanches)-01-13,00|2-BAURU%20DE%20FRANGO-01-14,00&adicionais=01-Hamburguer-4,00-1-1
function montarPedido() {
    let produtos = getParameter("produtos");
    let adicionais = getParameter("adicionais");
    let total_geral = 0.00;
    produtos.split('|').forEach((v, i) => {
        let total = 0.00;
        let arr = v.split('-');
        var id_produto = arr[0];
        let produto = arr[1];
        let qtd_produto = arr[2];
        let vl_produto = arr[3];

        let tr = jQuery('<tr>');
        let td = jQuery('<td>').text(qtd_produto);
        tr.append(td);
        td = jQuery('<td>').text(produto);
        tr.append(td);
        td = jQuery('<td>').text(vl_produto);
        tr.append(td);
        total = removerVirgula(vl_produto) + total;
        total_geral = total_geral + total;

        td = jQuery('<td id="total_' + i + '">').text(colocarVirgula(total));
        tr.append(td);
        jQuery('#pedido').append(tr);

        adicionais.split('|').forEach((ad, ii) => {
            let arr_ad = ad.split('-');
            var id_prod_adicional = arr_ad[0];
            let prod_adicional = arr_ad[1];
            let vl_prod_adicional = arr_ad[2];
            let qtd_prod_adicional = arr_ad[3];
            let id_prod_pai = arr_ad[4];
            if (id_prod_pai == id_produto) {
                let tr = jQuery('<tr>');
                let td = jQuery('<td>').text(' - ' + qtd_prod_adicional);
                tr.append(td);
                td = jQuery('<td>').text(prod_adicional);
                tr.append(td);
                td = jQuery('<td>').text(vl_prod_adicional);
                tr.append(td);
                td = jQuery('<td>').text('');
                tr.append(td);
                jQuery('#pedido').append(tr);

                total = removerVirgula(vl_prod_adicional) + total;
                total_geral = total_geral + removerVirgula(vl_prod_adicional);
                jQuery('#total_' + i).text(colocarVirgula(total))
            }
        });

    });
    jQuery('#total').text(colocarVirgula(total_geral));

}

montarPedido();