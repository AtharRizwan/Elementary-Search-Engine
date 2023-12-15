#The function to sort the document ids based on their word id frequencies
def sort_barrels_by_frequency(data):

    sorted_data = {}

    for outer_key, inner_dict in data.items():
        sorted_inner = dict(sorted(inner_dict.items(), key=lambda x: x[1], reverse=True))
        sorted_data[outer_key] = sorted_inner

    return sorted_data

#Getting the unsorted barrels
#(pass the unsorted barrel here in the inverted index function)
with open('inverted_index.json', 'r') as inverted_file:
    unsorted_barrels = json.load(inverted_file)

#passing the unsortde barrels and the funtcion returns sorted barrels
sorted_barrels = sort_barrels_by_frequency(unsorted_barrels)

#finally dumping the barrels back into the same file
with open('inverted_index.json', 'w') as f:
    json.dump(sorted_barrels, f, indent=3)