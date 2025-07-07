#!/bin/bash

# Style
_STYLE_RESET='\033[0m'
_STYLE_COLOR_RED='\033[31m'

# Constants
backend_swagger_base_url="https://m2-coord-back.onrender.com"
backend_swagger_uri="/api-json"
frontend_api_folder=src/api

# Checks before
if [ ! -d $frontend_api_folder ]; then
    echo -e "${_STYLE_COLOR_RED}You have to execute the script at the root of the frontend project${_STYLE_RESET}"
    exit 1
fi

# Step 1
echo -e "Deleting current API files..."
rm -rv --preserve-root "$frontend_api_folder"/*

# Step 2
echo -e "\nGenerating new API files..."
npx ng-openapi-gen --input "${backend_swagger_base_url}${backend_swagger_uri}" --output "$frontend_api_folder"

shopt -s extglob
cd src/api
rm -rf !(models)
cd -
