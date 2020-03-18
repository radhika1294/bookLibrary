function fetchBookByName() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTableData");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
    function onSubmit()
    {
        let booksDetails = {};
        let availableBooks = [];
        let bookName = $('#bname').val();
        booksDetails['bookName'] = bookName;

        let authorName = $('#author').val();
        booksDetails['authorName'] = authorName;

        let publication = $('#publication').val();
        booksDetails['publication'] = publication;

        let description = $('#description').val();
        booksDetails['description'] = description;

        let numOfCopies = $('#booksCount').val();
        booksDetails['bookName'] = bookName;

        let category = $('#category').val();
        booksDetails['category'] = category;

        let edition = $('#edition').val();
        booksDetails['edition'] = edition;

        let price = $('#price').val();
        booksDetails['price'] = price;
        
        let language = $('#language').val();
        booksDetails['language'] = language;

        //take local storage value 
        var localStorageKey = localStorage.getItem('listOfAvailableBooks');

        //check alray any value is there in local storage if it there then merge with new
        if(localStorageKey != null) {
            let storedRecords = JSON.parse(localStorageKey);
            if(storedRecords.length > 1){
                storedRecords.push(booksDetails);
                availableBooks = storedRecords;
                console.log(availableBooks);
            }
            else{availableBooks.push(storedRecords,booksDetails); }        
        }else{availableBooks = booksDetails;}        
        localStorage.setItem('listOfAvailableBooks',JSON.stringify(availableBooks));
        // clear the form
        $('#addBooks')[0].reset();
    }

    function showRecords(){
        //get stored values
        var availableBooks = localStorage.getItem('listOfAvailableBooks');
        console.log(availableBooks);
        //hide form and show table
        $('#addBooks').hide();
        $('#availableBooksRecord').show();

        // check localstorage have value or not
        if(availableBooks != null){
            availableBooks = JSON.parse(availableBooks);
            var table = document.getElementById("availableBooksRecord");
            //Create a HTML Table element.
            var table = document.createElement("TABLE");
            //table.border = "1";
            //Get the count of columns.
            var columnCount = availableBooks.length;
            //Add the header row.
            var row = table.insertRow(-1);
            for (const property in availableBooks[0]) {
                var headerCell = document.createElement("TH");
                //console.log(property + ':' + availableBooks[i][property]);
                headerCell.innerHTML = property;
                row.append(headerCell);
            }
            //Add the data rows.
            for (var i = 0; i < columnCount; i++) {
                row = table.insertRow(-1);
                for (const property in availableBooks[i]){
                    var cell = row.insertCell(-1);
                    cell.innerHTML = availableBooks[i][property];
                } 
            }
            var dvTable = $("#myTableData");
            dvTable.innerHTML = "";
            dvTable.append(table);
        }else{
            document.write('Sorry there is not records');     
        }
    }

    function showForm(){
        $('#addBooks').show();
        $('#myTableData').empty();
        $('#availableBooksRecord').hide();       
    }
    