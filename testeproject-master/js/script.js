var row, table = document.getElementById("table");
var matriz = []

function checkTextLines() {
    var nome = document.getElementById("nome").value;
    var condicao = document.getElementById("descricao").value;
    var tempFin = document.getElementById("temp_Fin").value;
    var time = document.getElementById("time").value;


    if (nome == "" || condicao == "" ) {
        alert("Alguma aba está vazia");
        return false;
    }
    else if(tempFin == "" || time == ""){
        document.getElementById("temp_Fin").value="";
        alert("A data está escrita Errada");
        return false;
    }
    else
        return true;
}

function restoreRows(){
    for (var i = 0; i < matriz.length; i++) {
    
        var newRow = table.insertRow(table.lengh);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);

        cell1.innerHTML = matriz[i][0];
        cell2.innerHTML = matriz[i][1];
        cell3.innerHTML = formatDate(matriz[i][2]);
        cell4.innerHTML = matriz[i][3];
        cell5.innerHTML = matriz[i][4];

    }

}

function formatDate(date){
    var aux = date.split("-");
    return aux[2].concat("/",aux[1],"/",aux[0])
}

function addRow() {

    if (checkTextLines()) {
        var nome = document.getElementById("nome").value;
        var condicao = document.getElementById("descricao").value;
        var tempFin = document.getElementById("temp_Fin").value;
        var time = document.getElementById("time").value;    

        var newRow = table.insertRow(table.lengh);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);

        cell1.innerHTML = nome;
        cell2.innerHTML = condicao;
        cell3.innerHTML = formatDate(tempFin);
        cell4.innerHTML = time;
        cell5.innerHTML = "Em Aberto";


        matriz[table.rows.length - 2] = new Array(5);
        matriz[table.rows.length - 2][0] = nome;
        matriz[table.rows.length - 2][1] = condicao;
        matriz[table.rows.length - 2][2] = tempFin;
        matriz[table.rows.length - 2][3] = time;
        matriz[table.rows.length - 2][4] = "Em Aberto";

        setTextLines("", "", "","");
    }
    RowSelected();
}

function setTextLines(nome, descricao, temp_Fin, time) {
    document.getElementById("nome").value = nome;
    document.getElementById("descricao").value = descricao;
    document.getElementById("temp_Fin").value = temp_Fin    
    document.getElementById("time").value = time
}

function RowSelected() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            row = this.rowIndex;
            setTextLines(this.cells[0].innerHTML, this.cells[1].innerHTML, matriz[row-1][2],this.cells[3].innerHTML);
        };

    }
}

function changeRow() {
    var nome = document.getElementById("nome").value;
    var condicao = document.getElementById("descricao").value;
    var tempFin = document.getElementById("temp_Fin").value;
    var time = document.getElementById("time").value;

    if (checkTextLines()) {
        table.rows[row].cells[0].innerHTML = nome;
        table.rows[row].cells[1].innerHTML = condicao;
        table.rows[row].cells[2].innerHTML = formatDate(tempFin);
        table.rows[row].cells[3].innerHTML = time;

        matriz[row-1][0]= nome;
        matriz[row-1][1]= condicao;
        matriz[row-1][2]= tempFin;
        matriz[row-1][3]= time;

        setTextLines("", "", "","");
    }
}

function changeStatus() {
    if (checkTextLines()) {
        table.rows[row].cells[4].innerHTML = "Completado";
        matriz[row - 1][4] = "Completado";

        setTextLines("", "", "","");
    }
}

function removeRow() {
    if(checkTextLines()){
          table.deleteRow(row);
          matriz.splice(row-1,1);
          setTextLines("","","","");
    }
}

function removeTable() {
    for (var i = table.rows.length; 1 < i; i--) {
        table.deleteRow(table.rows.length - 1);
    }

}

function sortByName() {

    removeTable();

    for (var i = 0; i < matriz.length; i++) {
        for (var o = i + 1;o < matriz.length; o++) {
            if (matriz[i][0] > matriz[o][0]) {
                
                aux=matriz[i]
                matriz[i] = matriz[o]
                matriz[o]=aux

            }
        }
    }


    restoreRows();
    RowSelected();

}

function sortByDate(){
    removeTable();

    for (var i = 0; i < matriz.length; i++) {
        for (var o = i + 1;o < matriz.length; o++) {
            if (matriz[i][2] > matriz[o][2]) {
                
                aux=matriz[i]
                matriz[i] = matriz[o]
                matriz[o]=aux

            }
        }
    }

    restoreRows();

    RowSelected();
    
}

RowSelected();