#!/usr/bin/env bash
TAG=`git tag | sort | tail -n 1`
HASH=`git show-ref -s $TAG`
git log --oneline $HASH..HEAD
