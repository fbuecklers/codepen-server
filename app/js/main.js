define(["jquery", "model/AddressBook", "controller/FormController", "controller/TableController"],
    function($, AddressBook, FormController, TableController) {
        var myAddressBook = new AddressBook();

        var ctrl = new FormController({
          el: $('form'),
          collection: myAddressBook
        });

        var table = new TableController({
          el: $('#table'),
          collection: myAddressBook
        });
    });

