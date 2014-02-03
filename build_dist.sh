#!/bin/sh

# Ensure there aren't any unsaved changes here
set -e
git diff --exit-code

# Build everything
grunt dist

# Move the dist somewhere safe
TEMP_DIR=`sh tasks/get_temp_dir.sh`

rm $TEMP_DIR -rf || true
mkdir $TEMP_DIR

mv dist/ $TEMP_DIR/

# Save our node_modules and bower_components directories
mv node_modules $TEMP_DIR/
mv bower_components $TEMP_DIR/

# Clean the working directory
git checkout .

# Bring back the dist files
git checkout gh-pages
mv $TEMP_DIR/dist/* ./

# Display the changes, and then let the user commit, etc.
git status

