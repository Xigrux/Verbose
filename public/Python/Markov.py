import simplejson
from summa import summarizer
import sys


with open("scpData.json") as f:
    text = f.read()

data = simplejson.loads(text)

dataSummary = []

for val in data:
    dict = {}
    #print("#############################################")
    #print("SCP-"+val['id'] + ": " + val["text"])

    dict['id']=val['id']
    dict['text']=summarizer.summarize(val['text'])

    dataSummary.append(dict)


data = simplejson.dumps(dataSummary.__str__(), sort_keys=True)

# now write output to a file
DataFile = open("scpSum.json", "w")
# magic happens here to make it pretty-printed
DataFile.write(simplejson.dumps(simplejson.loads(data), indent=4, sort_keys=True))
DataFile.close()


'''

with open("scpData.json") as f:
    text = f.read()

data = simplejson.loads(text)
print(data[0]["Description"])

text_model = markovify.Text(text)

print("######################################################")

for i in range(5):
    print(text_model.make_sentence())

'''

