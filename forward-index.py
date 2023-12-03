import json
from collections import Counter

# Load JSON data from a file
with open('abcnews.json', 'r') as file:
    data = json.load(file)

# data = data[0]['id']
# for a in data:
#     print(a['id'])


# content = data[0]['content']
# content = content.split()
# content = Counter(content)
# print(type(content))
mainList = []
tempObj = {}
mainObj = {}

for i in data:
    content = i['content']
    content = content.split()
    frequnecy = Counter(content)
    tempObj["id"] = i['id']
    tempObj["author"] = i['author']
    mainObj["Header"] = tempObj
    mainObj["Frequencies"] = frequnecy

    mainList.append(mainObj)

# print(mainList)

jsonFormatted = json.dumps(mainList)

with open('test-1.json','w') as outputFile:
    # print(jsonFormatted)
    outputFile.write(jsonFormatted)


