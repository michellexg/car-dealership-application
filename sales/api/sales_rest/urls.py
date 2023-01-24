from django.urls import path
from .views import list_sales, list_sales_history, create_sales_person, create_customer

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),
    path("sales/history/", list_sales_history, name="list_sales_history"),
    path("sales/salesperson/", create_sales_person, name="create_sales_person"),
    path("sales/customer/", create_customer, name="create_customer")
]
