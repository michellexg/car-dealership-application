import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest import models
from sales_rest.models import AutomobileVO
# Import models from sales_rest, here.
# from sales_rest.models import Something

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            url = "http://localhost:8100/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)
            for automobile in content["automobiles"]:
                AutomobileVO.objects.update_or_create(
                    vin = automobile["vin"],
                    defaults ={
                        "model": automobile["model"],
                        "year": automobile["year"],
                        "color": automobile["color"]
                    },
                )
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
