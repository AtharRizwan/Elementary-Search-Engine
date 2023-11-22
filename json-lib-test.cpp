#include <iostream>
#include <json\json.h>
#include <fstream>
using namespace std;


int main() {

	string line;
	fstream myFile("test-obj.json");

	Json::Value content;
	Json::Reader reader;

	reader.parse(myFile, content);

	cout << "Data:\n" << content;


	return 0;
}