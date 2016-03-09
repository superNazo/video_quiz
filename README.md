[![Build Status](https://coveralls.io/repos/github/superNazo/video_quiz/badge.svg?branch=coverall)](https://coveralls.io/github/superNazo/video_quiz?branch=coverall)
==============

## Frequent abbreviations.
* PR - pull request.

## How to get done with pull requests quick and painless? 

###Before push check the next points in your commits:
_1. Your code style is good.

> 
  1. You have no commented out lines of code. 
  2. You have two spaces indentations.
  3. You don't have unnecessary empty lines.
    1. You should have one empty line between method definitions. 
    2. You can divide logical parts of code with one empty line.
  4. You have one new line in the end of file. 

_2. You have committed proper files. 

>
  1. Your commit contains necessary files related to your feature ONLY. For example, if you do feature about Products you MUST NOT commit changes regarding tests for Stores feature etc.
  2. You didn't commit custom and temporary - compiled assets, uploaded images, /tmp folder, config files etc. Here could be exceptions, for example if you add some seed data you may add uploaded files. 

_3. Tests pass. 

> Run ALL tests before push. 

_4. Your branch contains only one feature. 

> One feature - one branch - one pull request

### After push check:
_1. Your branch is green. 

> 
It means all tests pass. 

_2. Your branch can be automatically merged. 

> 
You can check it when create a PR. If it can't be - deal with it:
* Merge fresh master into your branch. 
* Or create new branch from fresh master and merge your branch into there. 
* Or any other proper way. 
