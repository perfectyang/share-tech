import requests
from bs4 import BeautifulSoup
from requests.exceptions import RequestException
from threading import Thread as multiprocessline
from fake_useragent import UserAgent
ua = UserAgent()

class webScrawer:
    def __init__(self, urls, params = {'encoding': 'utf-8'}):
        self.urls = urls
        self.backResult = []
        self.params = params

    def crawContent(self, url):
        headers = {
          'Host': 'www.w3cplus.com',
          'User-Agent': ua.random
          # 'Cookie': 'has_js=1; Hm_lvt_177319b798978621f83845b12c86fa29=1547710407,1548296418,1548298301; Hm_lpvt_177319b798978621f83845b12c86fa29=1548299861'
        }
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                response.encoding = self.params['encoding']
                html = BeautifulSoup(response.text, 'html.parser')
                self.backResult.append(html)
                return html
            return None
        except RequestException as e:
            return None
    def startCrawUrl(self):
        result = []
        for url in self.urls:
            t = multiprocessline(target=self.crawContent, args=(url, ))
            result.append(t)
            t.start()
        for t in result:
            t.join()
    def saveFile(self, name, content):
        with open(name, 'w+', encoding='utf8') as f:
            f.write(str(content))
