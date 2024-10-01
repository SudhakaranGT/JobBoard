from flask import Flask, request, jsonify
import PyPDF2
import joblib
import re
import os
import spacy

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

# Load models and encoders
model_1 = joblib.load('resumeClassify_model_1.pkl')
model_2 = joblib.load('resumeClassify_model_2.pkl')
word_vectorizer = joblib.load('word_vectorizer.pkl')
le = joblib.load('label_encoder.pkl')

def cleanResume(resumeText):
    resumeText = re.sub('http\S+\s*', ' ', resumeText)  # remove URLs
    resumeText = re.sub('RT|cc', ' ', resumeText)  # remove RT and cc
    resumeText = re.sub('#\S+', '', resumeText)  # remove hashtags
    resumeText = re.sub('@\S+', '  ', resumeText)  # remove mentions
    resumeText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', resumeText)  # remove punctuations
    resumeText = re.sub(r'[^\x00-\x7f]', r' ', resumeText) 
    resumeText = re.sub('\s+', ' ', resumeText)  # remove extra whitespace
    return resumeText

def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text

def extract_skills(text, predefined_skills):
    """Extract skills from the resume text based on predefined skills."""
    doc = nlp(text)
    skills = set()  # Use a set to avoid duplicates
    for token in doc:
        if token.text.lower() in predefined_skills:
            skills.add(token.text)  # Add matching skills to the set
    return list(skills)  # Convert the set back to a list

@app.route('/predict', methods=['POST'])
def predict():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['resume']
    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'Invalid file format. Please upload a PDF file.'}), 400

    uploads_dir = 'uploads'
    os.makedirs(uploads_dir, exist_ok=True)
    file_path = os.path.join(uploads_dir, file.filename)
    file.save(file_path)

    # Extract text from the uploaded resume PDF
    resume_text = extract_text_from_pdf(file_path)
    if not resume_text:
        return jsonify({'error': 'Failed to extract text from the PDF file.'}), 400

    # Clean the resume text
    cleaned_resume = cleanResume(resume_text)
    
    # Get required skills from the request
    required_skills = request.form.getlist('required_skills')

    if not required_skills:
        return jsonify({'error': 'Required skills are required.'}), 400

    # Predict job categories
    vectorized_resume = word_vectorizer.transform([cleaned_resume])
    predicted_category_1 = model_1.predict(vectorized_resume)
    predicted_category_2 = model_2.predict(vectorized_resume)

    predicted_category_label_1 = le.inverse_transform(predicted_category_1)
    predicted_category_label_2 = le.inverse_transform(predicted_category_2)

    # Define predefined skills
    predefined_skills_lower = [skill.lower().strip() for skill in required_skills]

    extracted_skills = extract_skills(cleaned_resume, predefined_skills_lower)

    # Normalize extracted skills
    normalized_extracted_skills = [skill.lower().strip() for skill in extracted_skills]

    # Calculate matching skills and score
    matching_skills = set(normalized_extracted_skills) & set(predefined_skills_lower)
    
    score = len(matching_skills) / len(predefined_skills_lower) * 100 if predefined_skills_lower else 0

    return jsonify({
        'predicted_category_1': predicted_category_label_1[0],
        'predicted_category_2': predicted_category_label_2[0],
        'score_percentage': round(score, 2),
        'matching_skills': list(matching_skills)
    })

if __name__ == '__main__':
    app.run(port=5000)
