(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "product name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            alias: "product description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "price",
            alias: "product price",
dataType: tableau.dataTypeEnum.float
        }
    ];

        var tableSchema = {
            id: "productTable",
            alias: "products in store",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://dummyjson.com/products", function(resp) {
            var feat = resp.products,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "name": feat[i].title,
                    "description": feat[i].description,
                    "price": feat[i].price,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Products in Store"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
