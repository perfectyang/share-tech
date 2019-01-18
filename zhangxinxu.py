from webScrawer import webScrawer
import pdfkit
import os
from threading import Thread as multiprocessline
import json

class Blog():
    def __init__(self):
        self.storeAllLinks = []

    def initUrl(self, params):
        urls = []
        for n in range(params['begin'], params['end']):
          urls.append('https://www.zhangxinxu.com/wordpress/page/{}/'.format(n))
        self.webscrawer = webScrawer(urls)
        self.webscrawer.startCrawUrl()
        self.allHTML = self.webscrawer.backResult
        self.initParseLink(self.allHTML)
        return self.storeAllLinks

    def pdf(self, curLink, title):
        confg = pdfkit.configuration(wkhtmltopdf='/usr/local/bin/wkhtmltopdf')
        pdfkit.from_url(curLink, os.path.join(os.getcwd(), 'pdfbook', '{}.pdf'.format(title)), configuration=confg)
        print('--------{}--下载成功!!'.format(title))

    # 多线程
    def quickHandlePdf(self, pdfUrl):
        result = []
        for curUrl in pdfUrl:
            t = multiprocessline(target=self.pdf, args=(curUrl['link'], curUrl['title']))
            result.append(t)
            t.start()
        for t in result:
            t.join()

    # 保存文章路径
    def saveJs(self, storeAllLinks):
        datajson = {
          'list': storeAllLinks
        }
        self.webscrawer.saveFile('json/blog2.json', json.dumps(datajson, ensure_ascii=False))

    def initParseLink(self, allHTML):
        for html in allHTML:
            allLink = html.find_all(id='content')[0].select('.entry-title')
            for link in allLink:
                curLink = link.get('href')
                title = link.get_text()
                self.storeAllLinks.append({
                  'link': curLink,
                  'title': title
                })
        # quickHandlePdf(self.storeAllLinks)
        # self.saveJs()

#
numbList = [
  {
    'begin': 1,
    'end': 64
  },
  # {
  #   'begin': 10,
  #   'end': 20
  # },
  # {
  #   'begin': 20,
  #   'end': 10
  # },
  # {
  #   'begin': 30,
  #   'end': 40
  # },
  #  {
  #    'begin': 40,
  #    'end': 50
  #  },
  #  {
  #    'begin': 50,
  #    'end': 60
  #  },
  #  {
  #    'begin': 60,
  #    'end': 64
  #  }
]

blog = Blog()
for params in numbList:
   allinks = blog.initUrl(params)
   blog.saveJs(allinks)
   # blog.quickHandlePdf(allinks)
