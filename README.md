# Elementary Search Engine

## Data Set Details

For the project, we’ll be using the arXiv dataset which contains myriads of articles on various topics across STEM (Science, Technology, Engineering, Mathematics). It will serve as a good dataset for the semester project and also fulfills the requirements. 

## Frame Works

We plan to store our articles indexes in files. For accessing and dealing with the indexes, a server which basically retrieves relevant indexes and adds new articles etc. (Basically the main DSA part is implemented there). This second server is to be hosted as a C++ SDK server due to the fast computation power of the language. It will be connected to a frontend which will pass requests it. The frontend GUI is to be made in ReactJS, one of the leading industry standards today. Moreover, we can also deploy the frontend and the servers on cloud platforms and make the search engine available to all, however for the project, we plan to do it all on localhost.
