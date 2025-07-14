#!/bin/bash

# Create a new LeetCode solution file in the specified difficulty folder.
# 
# Usage: ./create.sh <easy|medium|hard> <number>
# Example: ./create.sh easy 2900

# Check if correct number of arguments provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <easy|medium|hard> <number>"
    exit 1
fi

FOLDER="$1"
NUMBER="$2"

# Validate folder parameter
if [[ ! "$FOLDER" =~ ^(easy|medium|hard)$ ]]; then
    echo "❌ Error: Folder must be 'easy', 'medium', or 'hard'"
    exit 1
fi

# Validate number parameter
if ! [[ "$NUMBER" =~ ^[0-9]+$ ]]; then
    echo "❌ Error: Number must be a valid integer"
    exit 1
fi

# Base folder (assumes script lives in LeetCode-Solutions root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_PATH="$SCRIPT_DIR/problems"
TARGET_DIR="$BASE_PATH/$FOLDER"

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Folder not found: $TARGET_DIR"
    exit 1
fi

FILE_NAME="$NUMBER.ts"
FILE_PATH="$TARGET_DIR/$FILE_NAME"

if [ -f "$FILE_PATH" ]; then
    echo "✔ File already exists: $FILE_PATH"
else
    # Create file with TypeScript stub
    cat > "$FILE_PATH" << 'EOF'
/*

</> Typescript code:
*/
EOF
    echo "➤ Created with stub: $FILE_PATH"
fi