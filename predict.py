import sys
import joblib
import json

# Get the contentID from the argument
input_id = sys.argv[1]

# Load the saved models
collaborative_model = joblib.load('collaborative.sav')
content_model = joblib.load('content.sav')

# Example: Make predictions for both models (replace with actual prediction logic)
# You may need to preprocess `input_id` before passing to the models depending on how your model was trained.
collaborative_recommendations = collaborative_model.predict([input_id])  # Example prediction call
content_recommendations = content_model.predict([input_id])  # Example prediction call

# Returning the predictions as a JSON object
recommendations = {
    'collaborative': collaborative_recommendations.tolist(),  # Convert to list for JSON serialization
    'content': content_recommendations.tolist()  # Convert to list for JSON serialization
}

# Output the results as a JSON string
print(json.dumps(recommendations))
