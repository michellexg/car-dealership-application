# CarCar

Team:

* Person 1 - Which microservice?
Tyler Herman - Sales



## How to Run this Application
(Steps to clone and run application)


## Design
(Excalidraw link)
https://excalidraw.com/#json=XTmY6l9yqwv6GdNNroFw2,Xu1p3KPtPpBVm4eISOHB5g

## Links
The List all Sales link is located in the Nav Bar.
Links to "Create a sale record", "Add a sales person", "Add a potential customer" and "Sales person history" are included on
the List all Sales page (localhost:3000/sales).

## CRUD Routes, API Documentation
Sales Service: Localhost, Port 8090

GET request to /api/sales/
Returns a list of sales records - one sale record below
    {
        "salerecord": [
            {
                "sales_person": {
                    "sales_person_name": "Veronica Sales",
                    "employee_number": 12,
                    "id": 1
                },
                "customer": {
                    "customer_name": "Xavi Herman",
                    "address": "123 Home Dr., Austin, TX 78721",
                    "phone_number": "9045557389",
                    "id": 1
                },
                "automobile": {
                    "import_href": "/api/automobiles/1C3CC5FB2AN120174/",
                    "vin": "1C3CC5FB2AN120174",
                    "model": "Valiant"
                },
                "price": 12000
            },
POST request to /api/sales/salerecord/
    Request Body:
    {
        "automobile": "/api/automobiles/5989934TJLSOP/",
        "sales_person": 2,
        "customer": 1,
        "price": 12
    }
    Return Body:
    {
        "automobile": {
            "import_href": "/api/automobiles/5989934TJLSOP/",
            "vin": "5989934TJLSOP",
            "model": "Valiant"
        },
        "sales_person": {
            "sales_person_name": "Mickey Salesperson",
            "employee_number": 1
        },
        "customer": {
            "customer_name": "Xavi Herman",
            "address": "123 Home Dr., Austin, TX 78721",
            "phone_number": "9045557389"
        },
        "price": 12
    }

POST request to /api/sales/customer/
    Request Body:
    {
	"customer_name": "Xavi Herman",
	"address": "123 Home Dr., Austin, TX 78721",
	"phone_number": 9045557389

}
    Return Body:
    {
	"customer_name": "Xavi Herman",
	"address": "123 Home Dr., Austin, TX 78721",
	"phone_number": 9045557389
}
POST request to /api/sales/salesperson/
    Request Body:
    {
	"sales_person_name": "Willy Willy",
	"employee_number": 3
}
    Return Body:
    {
	"sales_person_name": "Willy Willy",
	"employee_number": 3
}
GET request to /api/sales/history/
Returns sales history by selected sales person - one history record below:
    {
	"sales_history": [
		{
			"sales_person": {
				"sales_person_name": "Veronica Sales",
				"employee_number": 12,
				"id": 1
			},
			"customer": {
				"customer_name": "Xavi Herman",
				"address": "123 Home Dr., Austin, TX 78721",
				"phone_number": "9045557389",
				"id": 1
			},
			"automobile": {
				"import_href": "/api/automobiles/1C3CC5FB2AN120174/",
				"vin": "1C3CC5FB2AN120174",
				"model": "Valiant"
			},
			"price": 12000
		},
## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice
For the sales microservice, we are tracking the list of sales, the customers, sales persons and the sales record history.
The models used in this microservice were SaleRecord, SalesPerson, Customer and AutomobileVO. The AutomobileVO acts as a value object
related to the Automobile model of the inventory. This gives access to the necessary information to track automobiles in the inventory.
The SaleRecord model handles a table for the sales person, customer, automobile (via the vin number) and the price of the automobile. The
SaleRecord model also uses foreign keys for the sales person, customer and automobileVO in order to connect those tables and databases so that
all the relevant information from each table is tracked with the sales and updated accordingly.
