#!/bin/bash

# Survey Seed Script Execution
# This script runs the seed files in the correct order for the college questionnaire survey

echo "🚀 Starting Survey Seed Script Execution..."
echo "Form ID: e85960b4-4d78-4d9c-bdc2-ae263ff28d10"
echo ""

# Check if database connection parameters are provided
if [ -z "$1" ]; then
    echo "Usage: $0 <database_connection_string>"
    echo "Example: $0 'postgresql://username:password@localhost:5432/database_name'"
    exit 1
fi

DB_CONNECTION=$1

echo "📋 Step 1: Running questionnaire seed (questions and users)..."
psql "$DB_CONNECTION" -f scripts/seed-questionnaire.sql
if [ $? -eq 0 ]; then
    echo "✅ Questionnaire seed completed successfully"
else
    echo "❌ Error running questionnaire seed"
    exit 1
fi

echo ""
echo "📝 Step 2: Running answer sheets seed..."
psql "$DB_CONNECTION" -f scripts/seed-questionnaire-answers-complete.sql
if [ $? -eq 0 ]; then
    echo "✅ Answer sheets seed completed successfully"
else
    echo "❌ Error running answer sheets seed"
    exit 1
fi

echo ""
echo "📋 Step 3: Running additional answer sheets seed..."
psql "$DB_CONNECTION" -f scripts/seed-questionnaire-answers-additional.sql
if [ $? -eq 0 ]; then
    echo "✅ Additional answer sheets seed completed successfully"
else
    echo "❌ Error running additional answer sheets seed"
    exit 1
fi

echo ""
echo "🎉 Survey seed script execution completed!"
echo ""
echo "📊 Summary of seeded data:"
echo "- 10 new users (mahasiswa1-8, alumni1-2)"
echo "- 10 IPA questions (college academic topics)"
echo "- 10 Ratio/Multiple choice questions"
echo "- 7 Personal information questions"
echo "- 20+ answer sheets with diverse responses for comprehensive analytics"
echo ""
echo "🔍 To verify the data, you can run:"
echo "SELECT COUNT(*) FROM questions WHERE form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';"
echo "SELECT COUNT(*) FROM answer_sheets WHERE form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';"
echo "SELECT COUNT(*) FROM question_answers WHERE form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';"
