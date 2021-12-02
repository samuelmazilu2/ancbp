# ancbp

********************************************

ERROR when running:
C:\_Work\Projects\ancbp> git config --list
fatal: bad config line 5 in file C:/Users/admin/.gitconfig

Fixed git origin/remote access at PUSH by:
1. Added .gitconfig file in local repository dir
2. Added this section in path: C:/Users/admin/.gitconfig, under Windows environment:

[includeIf "gitdir:C:\_Work\Projects\ancbp"]
    path = C:\_Work\Projects\ancbp\.gitconfig


https://stackoverflow.com/questions/4220416/can-i-specify-multiple-users-for-myself-in-gitconfig

********************************************    

BRANCH NAMING (EPICS):

FUNC_XX1 -> functionality 
TECH_XX2 -> technical improvements/deploy/settings
MODULE_XX3 -> add big functionality/internal component/module
LIB_XX4 -> add library/external module
ML_XX5 -> robots/ML

e.g.: FUNC_001-AddFields...
********************************************  