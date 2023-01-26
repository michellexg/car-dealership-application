# CarCar

Team:

* Michelle Xue - Service
* Person 2 - Which microservice?

## Design

## CRUD Routes, API Documentation
### Technician:
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
### Appointment:
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

DELETE request to /api/appointments/<int:id>
Delete appointments based on their id numbers

POST request to /api/appointments/<int:id>
Change appointment's "finished" status from default false to true based on their id numbers

## React Paths
* Main Page: http:

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

Explain your models and integration with the inventory
microservice, here.
