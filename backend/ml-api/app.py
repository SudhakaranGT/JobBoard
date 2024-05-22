from flask import Flask, request, jsonify # type: ignore
import PyPDF2 # type: ignore
import joblib # type: ignore
import re

app = Flask(__name__)

# Load models and other necessary objects
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
    resumeText = re.sub(r'[^\x00-\x7f]',r' ', resumeText) 
    resumeText = re.sub('\s+', ' ', resumeText)  # remove extra whitespace
    return resumeText

def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

@app.route('/predict-job', methods=['POST'])
def predict_job():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['resume']
    file_path = f"uploads/{file.filename}"
    file.save(file_path)

    resume_text = extract_text_from_pdf(file_path)
    cleaned_resume = cleanResume(resume_text)
    vectorized_resume = word_vectorizer.transform([cleaned_resume])

    predicted_category_1 = model_1.predict(vectorized_resume)
    predicted_category_2 = model_2.predict(vectorized_resume)

    predicted_category_label_1 = le.inverse_transform(predicted_category_1)
    predicted_category_label_2 = le.inverse_transform(predicted_category_2)

    return jsonify({
        'predicted_category_1': predicted_category_label_1[0],
        'predicted_category_2': predicted_category_label_2[0]
    })

if __name__ == '__main__':
    app.run(port=5000)
