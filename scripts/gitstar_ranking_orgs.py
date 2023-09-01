import requests
from bs4 import BeautifulSoup
import os

def remove_element_at_index(array, index):
    if index < 0 or index >= len(array):
        raise IndexError("Index out of range")

    new_array = []
    for i in range(len(array)):
        if i != index:
            new_array.append(array[i])

    return new_array

def get_orgs_from_page(url):
    # Send an HTTP GET request to the webpage
    response = requests.get(url)
    organisations= []
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, "html.parser")

        # Find elements using CSS selectors and extract data
        for span in soup.find_all("span"):
            if "hidden-xs" in span["class"]:
                organisations.append(span.text.strip())
        organisations = remove_element_at_index(organisations, 0)
        return organisations

    else:
        print(f"Request failed with status code: {response.status_code}")
        return None

all_orgs = []
# URL of the webpage you want to scrape
for i in range(11, 21):
    url = f"https://gitstar-ranking.com/organizations?page={i}"
    orgs = get_orgs_from_page(url)
    all_orgs.extend(orgs)
    print(f"Total organizations: {len(all_orgs)}")
print(all_orgs)
output_directory = "scripts/assets"
os.makedirs(output_directory, exist_ok=True)
output_file = os.path.join(output_directory, "organisations2.txt")
with open(output_file, "w") as file:
    for org in all_orgs:
        file.write(org + "\n")
    file.close()




