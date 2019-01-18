import requests
from bs4 import BeautifulSoup
from requests.exceptions import RequestException
from threading import Thread as multiprocessline


class webScrawer:
    def __init__(self, urls, params = {'encoding': 'utf-8'}):
        self.urls = urls
        self.backResult = []
        self.params = params

    def crawContent(self, url):
        headers = {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
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
        with open(name, 'w+') as f:
            f.write(str(content))
