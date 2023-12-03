import json
from collections import Counter

# Load JSON data from a file
with open('369news.json', 'r') as file:
    data = json.load(file)


mainList = []
tempObj = {}
mainObj = {}

# words to be excluded from the frequency list
stop_words = {'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of',
    'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was',
    'will', 'with', '.', ',', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '[', ']', 'i','are','can','who'}

for i in data:
    content = i['content'].split()
    content = [
        word for word in content if word.lower() not in stop_words
    ]
    frequnecy = Counter(content)
    tempObj["id"] = i['id']
    tempObj["author"] = i['author']
    mainObj["Header"] = tempObj
    mainObj["Frequencies"] = frequnecy

    mainList.append(mainObj)



jsonFormatted = json.dumps(mainList)

with open('test-1.json','w') as outputFile:
    outputFile.write(jsonFormatted)


