### Set user name and email
Set your username:
git config user.name "FIRST_NAME LAST_NAME"

Set your email address:
git config user.email "MY_NAME@example.com"


### Git remove folder from tracking

Question

How do I remove a folder from my git repository without deleting it from my local machine (i.e., development environment)?

Answer

Step 1. Add the folder path to your repo's root .gitignore file.

path_to_your_folder/
Step 2. Remove the folder from your local git tracking, but keep it on your disk.

git rm -r --cached path_to_your_folder/