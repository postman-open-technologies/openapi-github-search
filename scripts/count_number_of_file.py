import requests


def getorgarray(filename):
    orgs_array = []
    with open(filename, 'r') as txtfile:
        for line in txtfile:
            orgs_array.append(line.strip())
        txtfile.close()
        return orgs_array

# Your GitHub personal access token
# Replace 'YOUR_ACCESS_TOKEN' with your actual token
access_token = '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'

# List of organizations (you can replace this with the actual list)
organizations = getorgarray("scripts/assets/organisations1.txt")

search_query = "openapi: 3 + organization:{org}"

total_results = 0

for org in organizations:
    # Construct the search query with the organization name
    query = search_query.format(org=org)

    # GitHub API endpoint for code search
    url = f"https://api.github.com/search/code?q={query}"

    headers = {'Authorization': f'Bearer {access_token}'}

    # Make the API request
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        # Parse the response to get the total count of results
        result_data = response.json()
        total_count = result_data.get('total_count', 0)
        total_results += total_count
        print(f"Organization: {org}, Results: {total_count}")
    else:
        print(f"Error for organization {org}: {response.status_code}")

print(f"Total Results across all organizations: {total_results}")