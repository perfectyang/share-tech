import os, json
files = os.listdir('./')
articleArr = []
for file in files:
    if file.startswith(('w3cplus')):
        print(file)
        with open(file, 'r+', encoding='utf8') as f:
            content = f.read()
            changeJSON = json.loads(content)
            print(changeJSON['list'])
            articleArr.extend(changeJSON['list'])

with open('article.json', 'w+', encoding='utf8') as fis:
    fis.write((json.dumps({'list': articleArr}, indent=4, ensure_ascii=False)))
