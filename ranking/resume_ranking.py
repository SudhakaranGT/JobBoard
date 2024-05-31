import fitz  
def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = ""
    for page_num in range(document.page_count):
        page = document.load_page(page_num)
        text += page.get_text()
    return text


# pdf_path = "Vishwaa D A - Batch 2025 - B.Tech. - Information Technology - mjXj5ZC (1).pdf"
pdf_path = "Vijay Veerasekaran - Batch 2025 - B.Tech. - Information Technology - iF5nlmC.pdf"
resume_text = extract_text_from_pdf(pdf_path)
# print(resume_text)


import spacy


nlp = spacy.load("en_core_web_sm")

predefined_skills = ["Python" ,  "Flask" ,  "API"  , "MySQL"  , "Databases" ,  "Programming" ,  "JIRA" ,  "Github" ,"javascript" , "pandas" , "dsa"]
predefined_skills_lower = [skill.lower() for skill in predefined_skills]

def extract_skills(text, predefined_skills):
    doc = nlp(text)
    skills = []
    for token in doc:
        if token.text in predefined_skills:
            skills.append(token.text)
    return skills

skills_extracted = list(set(extract_skills(resume_text, predefined_skills)))
print("Extracted skills: ",skills_extracted)





def match_and_rank_resumes(resume_texts, required_skills):
    required_skills_lower = [skill.lower() for skill in required_skills]
    resume_rankings = []
    for resume_text in resume_texts:
        resume_text_lower = resume_text.lower()
        extracted_skills = extract_skills(resume_text_lower, predefined_skills_lower)
        matching_skills = set([skill.lower() for skill in extracted_skills]) & set(required_skills_lower)
        score = len(matching_skills)
        resume_rankings.append((resume_text, score))
    
    ranked_resumes = sorted(resume_rankings, key=lambda x: x[1], reverse=True)
    return ranked_resumes



import os

def process_resumes(pdf_folder, required_skills):
    resume_texts = []

    for pdf_file in os.listdir(pdf_folder):
        if pdf_file.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, pdf_file)
            resume_text = extract_text_from_pdf(pdf_path)
            resume_texts.append(resume_text)

    ranked_resumes = match_and_rank_resumes(resume_texts, required_skills)
    
    return ranked_resumes

pdf_folder = "resumes"
required_skills =  ['Python', 'Databases', 'Programming', 'JIRA', 'Flask', 'Github', 'API', 'MySQL']
ranked_resumes = process_resumes(pdf_folder, required_skills)

for idx, (resume, score) in enumerate(ranked_resumes):
    print(f"Resume {idx+1}: Score {score}")
    print(resume)
