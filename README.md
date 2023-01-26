# CarCar

Team:

* Michelle Xue - Service
* Tyler Herman - Sales

## How to Run this Application
* Go to [gitlab.com/felipsh/project-beta](https://gitlab.com/felipsh/project-beta)
* Click “Clone” to clone project and copy the https link.
In terminal, run following commands:
* Clone the project folder: `git clone <copy clone link here>`
* Create a volume: `docker volume create beta-data`
* Create containers: `docker-compose build`
* Run containers: `docker-compose up`

In browser visit: [http://localhost:3000/](http://localhost:3000/)

## Design
[Excalidraw link](https://excalidraw.com/#json=_RpHKZ9bNUPAVw5wQZ1xK,wGDHxxrLtQZ9dDnCzo0yvA)

## CRUD Routes, API Documentation
### Service Microservice

#### Technician:
Localhost, Port 8080

GET request to /api/technicians/

Returns:
```
{
	"technicians": [
		{
			"name": "Jack",
			"employee_number": "1234567",
			"id": 1
		},
		...
	]
}
```
POST request to /api/technicians/

Request body:
```
{
	"name": "Kim",
	"employee_number": "111111"
}
```
Returns (status code 200):
```
{
	"name": "Kim",
	"employee_number": "111111"
}
```
#### Appointment:
Localhost Port 8080

GET request to /api/appointments/

Returns:
```
{
	"appointments": [
		{
			"id": 1,
			"vin": "1C3CC5FB2AN120100",
			"name": "Noor",
			"datetime": "2023-01-18T18:00:00+00:00",
			"reason": "Oil Change",
			"technician": {
				"name": "Jack",
				"employee_number": "1234567",
				"id": 1
			},
			"finished": false
		},
        ...
	]
}
```

POST request to /api/appointments/

Request body:
```
{
	"vin": "1C3CC5FB2AN120171",
	"name": "Jane",
	"datetime": "2023-01-23T10:00:00+01:00",
	"reason": "Change Oil",
	"technician": 1
}
```
Returns (status code 200):
```
{
	"id": 15,
	"vin": "1C3CC5FB2AN120171",
	"name": "Jane",
	"datetime": "2023-01-23T10:00:00+01:00",
	"reason": "Change Oil",
	"technician": {
		"name": "Jack",
		"employee_number": "1234567",
		"id": 1
	}
}
```

DELETE request to /api/appointments/<id>
Delete appointments based on their id numbers

POST request to /api/appointments/<id>
Change appointment's "finished" status from default false to true based on their id numbers

### Sales Microservice

#### Sales Record:
Localhost, Port 8090

GET request to /api/sales/

Returns a list of sales records - one sale record below
```
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
		...
	]
}
```

POST request to /api/sales/salerecord/

Request Body:
```
{
	"automobile": "/api/automobiles/5989934TJLSOP/",
	"sales_person": 2,
	"customer": 1,
	"price": 12
}
```
Return Body:
```
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
```

GET request to /api/sales/history/

Returns sales history by selected sales person - one history record below:
```
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
		...
	]
}
```

#### Customer:
Localhost, Port 8090

POST request to /api/sales/customer/

Request Body:
```
{
	"customer_name": "Xavi Herman",
	"address": "123 Home Dr., Austin, TX 78721",
	"phone_number": 9045557389
}
```
Return Body:
```
{
	"customer_name": "Xavi Herman",
	"address": "123 Home Dr., Austin, TX 78721",
	"phone_number": 9045557389
}
```

#### SalesPerson:
Localhost, Port 8090

POST request to /api/sales/salesperson/

Request Body:
```
{
	"sales_person_name": "Willy Willy",
	"employee_number": 3
}
```
Return Body:
```
{
	"sales_person_name": "Willy Willy",
	"employee_number": 3
}
```

## Links

* Nav Bar contains list views for manufacturers, models, automobiles, sales records, and service appointments.
* Link to "add a manufacturer" is included on the manufacturer list view.
* Link to "add a model" is included on the model list view.
* Link to "add an automobile" is included on the automobile list view.
* Link to "create a sale record", "add a sales person", "add a potential customer" and "sales record history by sales person" is included on the sales record list view.
* Link to "create a technician", "add an appointment", and "appointment history by VIN" are included on the service appointment list view.

### React Paths
* Main Page - [http://localhost:3000/](http://localhost:3000/)

* Manufacturers List - [http://localhost:3000/manufacturers/](http://localhost:3000/manufacturers/)
* Manufacturer Form - [http://localhost:3000/manufacturers/new/](http://localhost:3000/manufacturers/new/)

* Models List - [http://localhost:3000/models/](http://localhost:3000/models/)
* Model Form - [http://localhost:3000/models/new/](http://localhost:3000/models/new/)

* Automobiles List - [http://localhost:3000/automobiles/](http://localhost:3000/automobiles/)
* Automobile Form - [http://localhost:3000/automobiles/new/](http://localhost:3000/automobiles/new/)

* Sales Record List - [http://localhost:3000/sales/](http://localhost:3000/sales/)
* Sales Person Form - [http://localhost:3000/sales/salesperson/](http://localhost:3000/sales/salesperson/)
* Customer Form - [http://localhost:3000/sales/customer/](http://localhost:3000/sales/customer/)
* Sales Record Form - [http://localhost:3000/sales/new/](http://localhost:3000/sales/salerecord/)
* Search Sales Record History by Sales Person - [http://localhost:3000/sales/history/](http://localhost:3000/sales/history/)

* Service Appointment List - [http://localhost:3000/appointments/](http://localhost:3000/appointments/)
* Technician Form - [http://localhost:3000/appointments/technicians/new/](http://localhost:3000/appointments/technicians/new/)
* Service Appointment Form - [http://localhost:3000/appointments/new/](http://localhost:3000/appointments/new/)
* Search Service Appointment by VIN - [http://localhost:3000/appointments/history/](http://localhost:3000/appointments/history/)



## Service microservice

### Technician Model
Technian model has two properties: name and employee_number.

### Appointment Model
Appointment model has the following properties:
* vin: vin of the automobile for this service appointment
* name: name of the automobile's owner
* datetime: date and time of the service appointment
* reason: reason for the service appointment
* finished: a boolean field to determine if the service appointment has been finished. Default value as false.
* vip: a boolean field to determine if the automobile is purchased from the inventory based on the sales record. Default value as false.
* technician: a foreign key to Technician model

### SaleRecordVO Model
* A value object model created for the poller function
* This model has two properties: vin and import_href
* It keeps track of automobiles' vins from sales record

### Integration with the inventory microservice
The poller.py synchronize sales record data with Sales microservice. In views.py, there's a list to keep track of all vins from sales record. When a new Appointment object is created, the "vip" property will change to "true" if the vin is found in the vins list. Then in the service appointment list, there will be an indicator for a VIP appointment.

## Sales microservice
For the sales microservice, we are tracking the list of sales, the customers, salespersons and the sales record history. The models used in this microservice were Salerecord, SalesPerson, Customer and AutomobileVO. The AutomobileVO acts as a value object related to the Automobile model of the inventory. This gives access to the necessary information to track automobiles in the inventory via the poller. The SaleRecord model handles the table for the salesperson, customer, automobile (via the vin number) and the price of the automobile. The SaleRecord model also uses foreign keys for the salesperson, customer and automobileVO in order to connect those tables and databases so that all relevant information from each table is tracked with the sales and updated accordingly.
