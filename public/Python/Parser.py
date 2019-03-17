import requests, re, simplejson, json
from bs4 import BeautifulSoup


def getSCPS():

    #regex pattern
    pattern = "scp-\d+$"

    #websites to get the scp links
    websites = ['http://www.scp-wiki.net/top-rated-pages',
               'http://www.scp-wiki.net/top-rated-pages/p/2',
               'http://www.scp-wiki.net/top-rated-pages/p/3',
               'http://www.scp-wiki.net/top-rated-pages/p/4',
               'http://www.scp-wiki.net/top-rated-pages/p/5',
               'http://www.scp-wiki.net/top-rated-pages/p/6']

    #individual scp links
    links = []

    for website in websites:
        r = requests.get(website)
        soup = BeautifulSoup(r.text, "html.parser")
        tag = soup.select(".list-pages-box > p > a")

        for val in tag:
            match = re.search(pattern, val['href'])
            if match:
                links.append("http://www.scp-wiki.net"+val['href'])
                print(links[-1])


    return links

def getSCP(links):

    scpList = []


    itemPattern = "(Item) #:</strong> SCP-(\d+)"
    classPattern = "(Object Class):</strong> (\w+)</p>"
    procedurePattern = "(?<=(Special Containment Procedures))(.*)(?=Description)"
    descriptionPattern = "(?<=(Description):)(.*)(?=<strong>)"


    for link in links:
        scpDict = {}
        r = requests.get(link)
        soup = BeautifulSoup(r.text, "html.parser")
        tag = soup.select("#page-content > p")

        matchItem = re.search(itemPattern, tag.__str__())

        if matchItem is not None:
            scpDict["id"] = matchItem.group(2)
            matchDescription = re.search(descriptionPattern, tag.__str__())

            if matchDescription is not None:
                cleanup = re.sub("(?=(<))(.*?)(?<=(>))", "", matchDescription.group(2))
                cleanup = re.sub("SCP-\d+","[     ]", cleanup)
                cleanup = re.sub("(\\\\\\\\u\w+)", "", cleanup)
                scpDict["text"] = cleanup

            if matchDescription is not None:
                scpList.append(scpDict)
        '''
        matchClass = re.search(classPattern, tag.__str__())

        if matchClass is not None:
            scpDict[matchClass.group(1)] = matchClass.group(2)
        '''

        '''
        matchProcedure = re.search(procedurePattern, tag.__str__())

        if matchProcedure is not None:
            cleanup = re.sub("(?=(<))(.*?)(?<=(>))", "", matchProcedure.group(2))
            cleanup = re.sub("(\\\\\\\\u\w+)", "", cleanup)
            scpDict[matchProcedure.group(1)] = cleanup
        '''




    return scpList



lotsOfLinks = getSCPS()


jsonText = getSCP(lotsOfLinks)


'''
for val in jsonText:
    for key, item in val.items():
        print(key + " : " + item)
'''

data = json.dumps(jsonText, sort_keys=True)

# now write output to a file
DataFile = open("scpData.json", "w")
# magic happens here to make it pretty-printed
DataFile.write(simplejson.dumps(simplejson.loads(data), indent=4, sort_keys=True))
DataFile.close()


