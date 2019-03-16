import requests, re
from html.parser import HTMLParser
from bs4 import BeautifulSoup

#regex pattern
pattern = "scp-\d+$"

#websites to get the scp links
websites= ['http://www.scp-wiki.net/top-rated-pages',
           'http://www.scp-wiki.net/top-rated-pages/p/2',
           'http://www.scp-wiki.net/top-rated-pages/p/3',
           'http://www.scp-wiki.net/top-rated-pages/p/4',
           'http://www.scp-wiki.net/top-rated-pages/p/5',
           'http://www.scp-wiki.net/top-rated-pages/p/6']

#individual scp links
links= []

for website in websites:
    r = requests.get(website)

    soup = BeautifulSoup(r.text, "html.parser")
    tag = soup.select(".list-pages-box > p > a")

    for val in tag:
        match = re.search(pattern, val['href'])
        if match:
            links.append("http://www.scp-wiki.net"+val['href'])
            print(links[-1])


