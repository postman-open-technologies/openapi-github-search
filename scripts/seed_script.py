# Description: This script is used to seed the database with data from the data folder
# !pip install requests
# python scripts/seed_script.py to run from main folder

import requests

def call_local_endpoint(query):
    url = f'http://localhost:8080/openapi?{query}'
    print(f"Calling {url}")
    
    try:
        response = requests.post(url)
        
        # Check if the response was successful (status code 200)
        if response.status_code == 200:
            print("Request to localhost:8080/search was successful!")
            print("Response content:")
            print(response.text)
        else:
            print(f"Request to localhost:8080/active failed with status code: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

def loadbyorganisations(filename):
    orgs_array = []
    with open(filename, 'r') as txtfile:
        for line in txtfile:
            orgs_array.append(line.strip())
    for org in orgs_array:
        query = f"org={org}"
        call_local_endpoint(query)


if __name__ == "__main__":
    #Get Open API files
    loadbyorganisations("scripts/assets/organisations.txt")

#Have to load Swagger Files too
#Load by Repository
