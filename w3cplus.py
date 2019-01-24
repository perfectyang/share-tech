import os, json
from webScrawer import webScrawer
from threading import Thread as multiprocessline
allInfo = []
def parseHtml(html):
    allArticles = html.find_all(id='page')[0].select('.node-blog')
    for article in allArticles:
        title = article.select('h1')[0].get_text().replace('\n', '')
        link = 'https://www.w3cplus.com' + article.select('.node_read_more')[0].get('href')
        description = article.select('.body-content')[0].get_text()
        allInfo.append({
          'link': link,
          'title': title,
          'description': description,
        })
        print('{}---------------------成功解析!!'.format(title))

def moreProgress(allHtml):
    result = []
    for html in allHtml:
        t = multiprocessline(target=parseHtml, args=(html,))
        result.append(t)
        t.start()
    for t in result:
        t.join()

def main():
    urls = []
    allArticle = []
    for n in range(130, 140):
        curl = 'https://www.w3cplus.com/?page={}'.format(n)
        urls.append(curl)
    print('urls', urls)
    webscrawer = webScrawer(urls)
    webscrawer.startCrawUrl()
    allHtml = webscrawer.backResult
    print('所有', allHtml)
    moreProgress(allHtml)
    datajson = {
      'list': allInfo
    }
    webscrawer.saveFile('json/w3cplus11_{}.json'.format(len(allInfo)), json.dumps(datajson, ensure_ascii=False))
    print('总共数据:{}条'.format(len(allInfo)))

main()
