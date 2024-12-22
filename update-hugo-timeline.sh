#!/bin/bash

cp -f ../hugo-timeline/layouts/partials/*.html layouts/partials/.
cp -f ../hugo-timeline/layouts/shortcodes/*.html layouts/shortcodes/.
cp -f ../hugo-timeline/static/css/*.css static/css/.
mv -f go.mod .go.mod
mv -f go.sum .go.sum


