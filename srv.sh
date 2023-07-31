#!/bin/sh

docker run --volume="$PWD/docs:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve