function validateForm() {
    let email = document.getElementById('imputEmail').value
    let name = document.getElementById('imputName').value
    let phone = document.getElementById('imputNumber').value

    if (email == '') {
        alert('El campo correo es requerido')
        return false
    } else if (!email.includes('@')) {
        alert('El correo no es valido')
        return false
    }
   
    if (name == '') {
        alert('El campo nombre es requerido')
        return false
    } 

    if (phone == '') {
        alert('El campo telefono es requerido')
        return false
    } 

    return true
}

function ReadData() {

    let listadoPersonas

    if(localStorage.getItem('listadoPersonas') == null) {
        listadoPersonas = []
    } else {
        listadoPersonas = JSON.parse(localStorage.getItem('listadoPersonas'))
    }


    var html = "";

    listadoPersonas.forEach(function(element, index){
        html += '<tr>';
        html += '<td>' + element.email + '</td>';
        html += '<td>' + element.name + '</td>';
        html += '<td>' + element.phone + '</td>';
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar Dato</button> <button onclick="editData('+ index +')" class="btn btn-warning">Editar Dato</button>'
        html += '</tr>'
    })

    document.querySelector('#tableData').innerHTML = html
}

document.addEventListener('DOMContentLoaded', function() {
    ReadData();
});


function AddData(){
    if(validateForm() == true) {
        let email = document.getElementById('imputEmail').value
        let name = document.getElementById('imputName').value
        let phone = document.getElementById('imputNumber').value

        var listadoPersonas

        if(localStorage.getItem('listadoPersonas') == null) {
            listadoPersonas = []
        } else {
            listadoPersonas = JSON.parse(localStorage.getItem('listadoPersonas'))
        }

        listadoPersonas.push({
            email: email,
            name: name,
            phone: phone

        })

        localStorage.setItem('listadoPersonas', JSON.stringify(listadoPersonas))

        ReadData()

        document.getElementById('imputEmail').value=""
        document.getElementById('imputName').value=""
        document.getElementById('imputNumber').value=""
    }

}

function deleteData(index) {
    let listadoPersonas

    if(localStorage.getItem('listadoPersonas') == null) {
        listadoPersonas = []
    } else {
        listadoPersonas = JSON.parse(localStorage.getItem('listadoPersonas'))
    }

    listadoPersonas.splice(index, 1)
    localStorage.setItem('listadoPersonas', JSON.stringify(listadoPersonas))

    ReadData()
}

function editData(index){
    document.getElementById('btnAdd').style.display = 'none'
    document.getElementById('btnUpdate').style.display = 'block'

    let listadoPersonas

    if(localStorage.getItem('listadoPersonas') == null) {
        listadoPersonas = []
    } else {
        listadoPersonas = JSON.parse(localStorage.getItem('listadoPersonas'))
    }

    document.getElementById('imputEmail').value = listadoPersonas[index].email
    document.getElementById('imputName').value = listadoPersonas[index].name
    document.getElementById('imputNumber').value = listadoPersonas[index].phone

    document.querySelector('btnUpdate').onclick = function() {
        if(validateForm() == true){
            listadoPersonas[index].email = document.getElementById('imputEmail').value
            listadoPersonas[index].name = document.getElementById('imputName').value
            listadoPersonas[index].phone = document.getElementById('imputNumber').value

            localStorage.setItem('listadoPersonas', JSON.stringify(listadoPersonas))
            ReadData()

            document.getElementById('imputEmail').value = ''
            document.getElementById('imputName').value = ''
            document.getElementById('imputNumber').value = ''

            document.getElementById('btnAdd').style.display = 'block'
            document.getElementById('btnUpdate').style.display = 'none'
        }
    }
}