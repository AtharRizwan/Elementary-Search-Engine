import csv

# Converts a TSV file to a CSV file
def convert_tsv_to_csv(tsv_filename, csv_filename):

    # Open the TSV file and read it
    with open(tsv_filename, 'r', encoding="utf8") as tsv_file: 
        tsv_reader = csv.reader(tsv_file, delimiter='\t')
        
        with open(csv_filename, 'w', newline='') as csv_file:
            csv_writer = csv.writer(csv_file, delimiter=',')

            for row in tsv_reader:
                csv_writer.writerow(row)

# Main code
tsv_filename = 'data.tsv'
csv_filename = 'data.csv'
convert_tsv_to_csv(tsv_filename, csv_filename)
