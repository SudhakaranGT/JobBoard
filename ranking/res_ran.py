import fitz
import os
import spacy

def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = ""
    for page_num in range(document.page_count):
        page = document.load_page(page_num)
        text += page.get_text()
    return text


nlp = spacy.load("en_core_web_sm")

predefined_skills = ["Python", "Flask", "API", "MySQL", "Databases", "Programming", "JIRA", "Github", "JavaScript", "pandas", "DSA"]
predefined_skills_lower = [skill.lower() for skill in predefined_skills]

def extract_skills(text, predefined_skills):
    doc = nlp(text)
    skills = []
    for token in doc:
        if token.text.lower() in predefined_skills:
            skills.append(token.text)
    return skills

def match_and_rank_resumes(resume_texts_with_paths, required_skills):
    required_skills_lower = [skill.lower() for skill in required_skills]
    resume_rankings = []
    for resume_text, path in resume_texts_with_paths:
        resume_text_lower = resume_text.lower()
        extracted_skills = extract_skills(resume_text_lower, predefined_skills_lower)
        matching_skills = set(skill.lower() for skill in extracted_skills) & set(required_skills_lower)
        score = len(matching_skills)
        resume_rankings.append((path, score))
    
    ranked_resumes = sorted(resume_rankings, key=lambda x: x[1], reverse=True)
    return ranked_resumes

def process_resumes(pdf_folder, required_skills):
    resume_texts_with_paths = []

    for pdf_file in os.listdir(pdf_folder):
        if pdf_file.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, pdf_file)
            resume_text = extract_text_from_pdf(pdf_path)
            resume_texts_with_paths.append((resume_text, pdf_path))
    

    ranked_resumes = match_and_rank_resumes(resume_texts_with_paths, required_skills)
    
    return ranked_resumes

pdf_folder = "resumes"
required_skills = ["Python", "Databases", "Programming", "JIRA", "Flask", "Github", "API", "MySQL"]
ranked_resumes = process_resumes(pdf_folder, required_skills)

for idx, (path, score) in enumerate(ranked_resumes):
    print(f"Resume {idx+1}: Path {path}, Score {score}")
