#!/bin/bash

# Check if a commit message was provided
if [ $# -eq 0 ]; then
    echo "Usage: ./push.sh \"Your commit message here\""
    echo "Example: ./push.sh \"Updated resume template with editing features\""
    exit 1
fi

# Get the commit message from the first argument
COMMIT_MESSAGE="$1"

echo "🚀 Starting automatic push to GitHub..."
echo "📝 Commit message: $COMMIT_MESSAGE"

# Add all changes
echo "📁 Adding all changes..."
git add .

# Commit with the provided message
echo "💾 Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push

echo "✅ Successfully pushed to GitHub!"
echo "🔗 Check your repository at: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/')" 