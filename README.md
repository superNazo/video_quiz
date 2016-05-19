[![Coverage Status](https://coveralls.io/repos/github/superNazo/video_quiz/badge.svg?branch=master&)](https://coveralls.io/github/superNazo/video_quiz?branch=master) [![Codeship Status for superNazo/video_quiz](https://codeship.com/projects/5c5eef50-c777-0133-7cf7-6e2d04338f84/status?branch=master)](https://codeship.com/projects/139036) [![Codacy Badge](https://api.codacy.com/project/badge/grade/f08ec20eb42d40efb140b96d62811fa1)](https://www.codacy.com/app/vovka/video_quiz)

==============

## Frequent abbreviations.
* PR - pull request.

## how to name branches.

feature/\<description\> - for new stuff, usually you address a 'task' in jira.

bugfix/\<description\> - bugfixes, usually you address a 'bug' in jira.

## Simple git flow.

git checkout -b feature/\<description\>

git commit file1 file2 file3

git push origin fetaute/\<description\>

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
