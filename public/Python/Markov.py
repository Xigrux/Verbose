import simplejson
from summa import summarizer
import sys


with open("scpData.json") as f:
    text = f.read()

data = simplejson.loads(text)

dataSummary = []

for val in data:
    print("#############################################")
    print("SCP-"+val['id'] + ": " + val["text"])

    dataSummary.append({"SCP-"+val['id'], summarizer.summarize(val['text'])})
    print("Summary: " + summarizer.summarize(val['text']))



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

