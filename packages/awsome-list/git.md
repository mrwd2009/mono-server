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

### Get add tag comment
```
git tag -a v1.4 -m "my version 1.4"

git tag 1.0.5
git push origin 1.0.5
git push origin --delete 1.0.5

//Delete remote:
git push -d origin $(git tag -l "tag_prefix*")

// Delete local:
git tag -d $(git tag -l "tag_prefix*")

// Examples:
git tag -d $(git tag -l "v1.0*")
git push -d origin $(git tag -l "*v3.[2]*-beta*")
```